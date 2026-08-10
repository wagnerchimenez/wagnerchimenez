<?php

namespace App\Exports;

use App\Models\Pedido;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PedidosExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Pedido::query()
            ->with('items')
            ->latest()
            ->get();
    }

    public function headings(): array
    {
        return [
            'ID',
            'Cliente',
            'Status',
            'Total',
            'Itens',
            'Processado em',
            'Criado em',
        ];
    }

    /**
     * @param  Pedido  $pedido
     */
    public function map($pedido): array
    {
        return [
            $pedido->id,
            $pedido->cliente,
            $pedido->status,
            number_format((float) $pedido->total, 2, ',', '.'),
            $pedido->items->count(),
            optional($pedido->processado_em)?->format('d/m/Y H:i'),
            $pedido->created_at?->format('d/m/Y H:i'),
        ];
    }
}
