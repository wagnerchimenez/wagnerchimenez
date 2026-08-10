<?php

use App\Jobs\ProcessarPedidoJob;
use App\Models\Pedido;
use App\Models\User;
use Illuminate\Support\Facades\Queue;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('cria pedido com itens e despacha job na fila pedidos', function () {
    Queue::fake();

    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $response = $this->actingAs($user)->post(route('pedidos.store'), [
        'cliente' => 'Cliente Teste',
        'items' => [
            [
                'produto' => 'Peça A',
                'quantidade' => 2,
                'preco_unitario' => 10.5,
            ],
        ],
    ]);

    $response->assertRedirect(route('pedidos.index'));

    $pedido = Pedido::query()->first();

    expect($pedido)->not->toBeNull()
        ->and($pedido->cliente)->toBe('Cliente Teste')
        ->and((float) $pedido->total)->toBe(21.0)
        ->and($pedido->items)->toHaveCount(1);

    Queue::assertPushedOn('pedidos', ProcessarPedidoJob::class);
});

it('processa pedido via job e marca como concluido', function () {
    $user = User::factory()->create();

    $pedido = Pedido::create([
        'user_id' => $user->id,
        'cliente' => 'Cliente Job',
        'status' => Pedido::STATUS_PENDENTE,
        'total' => 50,
    ]);

    $pedido->items()->create([
        'produto' => 'Item',
        'quantidade' => 1,
        'preco_unitario' => 50,
        'subtotal' => 50,
    ]);

    (new ProcessarPedidoJob($pedido))->handle();

    $pedido->refresh();

    expect($pedido->status)->toBe(Pedido::STATUS_CONCLUIDO)
        ->and($pedido->processado_em)->not->toBeNull();
});

it('exibe dashboard autenticado com estatisticas', function () {
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    Pedido::create([
        'user_id' => $user->id,
        'cliente' => 'A',
        'status' => Pedido::STATUS_CONCLUIDO,
        'total' => 100,
    ]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Dashboard')
            ->has('stats')
            ->where('stats.quantidade', 1));
});

it('responde healthcheck em /api/saude', function () {
    $response = $this->getJson(route('saude'));

    $response->assertJsonStructure([
        'status',
        'checks' => [
            'database',
            'redis',
            'fila',
        ],
        'timestamp',
    ]);

    expect($response->json('checks.database.status'))->toBe('up');
});
