<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $totais = Pedido::query()
            ->selectRaw('COUNT(*) as quantidade')
            ->selectRaw('COALESCE(SUM(total), 0) as valor_total')
            ->first();

        $porStatus = Pedido::query()
            ->select('status', DB::raw('COUNT(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        $recentes = Pedido::query()
            ->withCount('items')
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'quantidade' => (int) $totais->quantidade,
                'valor_total' => (float) $totais->valor_total,
                'por_status' => [
                    'pendente' => (int) ($porStatus['pendente'] ?? 0),
                    'processando' => (int) ($porStatus['processando'] ?? 0),
                    'concluido' => (int) ($porStatus['concluido'] ?? 0),
                    'cancelado' => (int) ($porStatus['cancelado'] ?? 0),
                ],
            ],
            'recentes' => $recentes,
        ]);
    }
}
