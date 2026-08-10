<?php

namespace App\Jobs;

use App\Exports\PedidosExport;
use App\Models\Relatorio;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

class GerarRelatorioPedidosJob implements ShouldQueue
{
    use Queueable;

    public function __construct(public Relatorio $relatorio) {}

    public function handle(): void
    {
        $relatorio = $this->relatorio->fresh();

        if (! $relatorio) {
            return;
        }

        $relatorio->update(['status' => Relatorio::STATUS_PROCESSANDO]);

        $path = 'relatorios/pedidos-'.$relatorio->id.'-'.now()->format('YmdHis').'.xlsx';

        Excel::store(new PedidosExport, $path, 'local');

        $relatorio->update([
            'status' => Relatorio::STATUS_CONCLUIDO,
            'arquivo_path' => $path,
            'concluido_em' => now(),
            'erro' => null,
        ]);
    }

    public function failed(?Throwable $exception): void
    {
        $this->relatorio->update([
            'status' => Relatorio::STATUS_FALHOU,
            'erro' => $exception?->getMessage(),
        ]);
    }
}
