<?php

namespace App\Jobs;

use App\Models\Pedido;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class ProcessarPedidoJob implements ShouldQueue
{
    use Queueable;

    public function __construct(public Pedido $pedido) {}

    public function handle(): void
    {
        $pedido = $this->pedido->fresh('items');

        if (! $pedido || $pedido->status === Pedido::STATUS_CANCELADO) {
            return;
        }

        $pedido->update(['status' => Pedido::STATUS_PROCESSANDO]);

        // Simula processamento assíncrono (pagamento, estoque, etc.)
        usleep(200_000);

        $pedido->update([
            'status' => Pedido::STATUS_CONCLUIDO,
            'processado_em' => now(),
        ]);

        Log::info('Pedido processado', ['pedido_id' => $pedido->id]);
    }
}
