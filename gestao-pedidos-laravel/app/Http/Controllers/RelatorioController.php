<?php

namespace App\Http\Controllers;

use App\Jobs\GerarRelatorioPedidosJob;
use App\Models\Relatorio;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RelatorioController extends Controller
{
    public function index(Request $request): Response
    {
        $relatorios = Relatorio::query()
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('Relatorios/Index', [
            'relatorios' => $relatorios,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $relatorio = Relatorio::create([
            'user_id' => $request->user()->id,
            'tipo' => 'pedidos',
            'status' => Relatorio::STATUS_PENDENTE,
        ]);

        GerarRelatorioPedidosJob::dispatch($relatorio)->onQueue('relatorios');

        return redirect()
            ->route('relatorios.index')
            ->with('success', 'Relatório enfileirado. Atualize a página em alguns segundos.');
    }

    public function download(Request $request, Relatorio $relatorio): StreamedResponse
    {
        abort_unless($relatorio->user_id === $request->user()->id, 403);
        abort_unless($relatorio->status === Relatorio::STATUS_CONCLUIDO && $relatorio->arquivo_path, 404);
        abort_unless(Storage::disk('local')->exists($relatorio->arquivo_path), 404);

        return Storage::disk('local')->download(
            $relatorio->arquivo_path,
            'relatorio-pedidos-'.$relatorio->id.'.xlsx'
        );
    }
}
