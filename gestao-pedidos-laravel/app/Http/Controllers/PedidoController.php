<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessarPedidoJob;
use App\Models\Pedido;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class PedidoController extends Controller
{
    public function index(Request $request): Response
    {
        $pedidos = Pedido::query()
            ->with('items')
            ->when($request->string('status')->toString(), fn ($q, $status) => $q->where('status', $status))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Pedidos/Index', [
            'pedidos' => $pedidos,
            'filtros' => [
                'status' => $request->string('status')->toString(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Pedidos/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $dados = $request->validate([
            'cliente' => ['required', 'string', 'max:255'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.produto' => ['required', 'string', 'max:255'],
            'items.*.quantidade' => ['required', 'integer', 'min:1'],
            'items.*.preco_unitario' => ['required', 'numeric', 'min:0.01'],
        ]);

        $pedido = DB::transaction(function () use ($dados, $request) {
            $pedido = Pedido::create([
                'user_id' => $request->user()->id,
                'cliente' => $dados['cliente'],
                'status' => Pedido::STATUS_PENDENTE,
                'total' => 0,
            ]);

            foreach ($dados['items'] as $item) {
                $subtotal = round($item['quantidade'] * $item['preco_unitario'], 2);
                $pedido->items()->create([
                    'produto' => $item['produto'],
                    'quantidade' => $item['quantidade'],
                    'preco_unitario' => $item['preco_unitario'],
                    'subtotal' => $subtotal,
                ]);
            }

            $pedido->recalcularTotal();

            return $pedido->fresh('items');
        });

        ProcessarPedidoJob::dispatch($pedido)->onQueue('pedidos');

        return redirect()
            ->route('pedidos.index')
            ->with('success', 'Pedido criado e enfileirado para processamento.');
    }

    public function show(Pedido $pedido): Response
    {
        $pedido->load('items');

        return Inertia::render('Pedidos/Show', [
            'pedido' => $pedido,
        ]);
    }

    public function updateStatus(Request $request, Pedido $pedido): RedirectResponse
    {
        $dados = $request->validate([
            'status' => ['required', Rule::in([
                Pedido::STATUS_PENDENTE,
                Pedido::STATUS_PROCESSANDO,
                Pedido::STATUS_CONCLUIDO,
                Pedido::STATUS_CANCELADO,
            ])],
        ]);

        $pedido->update(['status' => $dados['status']]);

        return back()->with('success', 'Status atualizado.');
    }
}
