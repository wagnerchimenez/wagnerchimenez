<?php

namespace Database\Seeders;

use App\Models\Pedido;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PedidoSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()->firstOrCreate(
            ['email' => 'demo@gestao-pedidos.test'],
            [
                'name' => 'Demo Wagner',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $exemplos = [
            [
                'cliente' => 'Oficina Central',
                'status' => Pedido::STATUS_CONCLUIDO,
                'items' => [
                    ['produto' => 'Filtro de óleo', 'quantidade' => 2, 'preco_unitario' => 45.9],
                    ['produto' => 'Pastilha de freio', 'quantidade' => 1, 'preco_unitario' => 189.0],
                ],
            ],
            [
                'cliente' => 'Salão Elite Filial 1',
                'status' => Pedido::STATUS_PENDENTE,
                'items' => [
                    ['produto' => 'Shampoo profissional', 'quantidade' => 5, 'preco_unitario' => 32.5],
                ],
            ],
            [
                'cliente' => 'Auto Peças Sul',
                'status' => Pedido::STATUS_PROCESSANDO,
                'items' => [
                    ['produto' => 'Amortecedor', 'quantidade' => 2, 'preco_unitario' => 420],
                    ['produto' => 'Buchas', 'quantidade' => 4, 'preco_unitario' => 28],
                ],
            ],
        ];

        foreach ($exemplos as $exemplo) {
            $pedido = Pedido::create([
                'user_id' => $user->id,
                'cliente' => $exemplo['cliente'],
                'status' => $exemplo['status'],
                'total' => 0,
                'processado_em' => $exemplo['status'] === Pedido::STATUS_CONCLUIDO ? now() : null,
            ]);

            foreach ($exemplo['items'] as $item) {
                $subtotal = round($item['quantidade'] * $item['preco_unitario'], 2);
                $pedido->items()->create([
                    ...$item,
                    'subtotal' => $subtotal,
                ]);
            }

            $pedido->recalcularTotal();
        }
    }
}
