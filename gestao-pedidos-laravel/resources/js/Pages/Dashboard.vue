<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    stats: {
        type: Object,
        required: true,
    },
    recentes: {
        type: Array,
        default: () => [],
    },
});

const formatMoney = (value) =>
    Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                Dashboard de Pedidos
            </h2>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div class="rounded-lg bg-white p-6 shadow-sm">
                        <p class="text-sm text-gray-500">Total de pedidos</p>
                        <p class="mt-2 text-3xl font-semibold text-gray-900">
                            {{ stats.quantidade }}
                        </p>
                    </div>
                    <div class="rounded-lg bg-white p-6 shadow-sm">
                        <p class="text-sm text-gray-500">Valor total</p>
                        <p class="mt-2 text-3xl font-semibold text-gray-900">
                            {{ formatMoney(stats.valor_total) }}
                        </p>
                    </div>
                    <div class="rounded-lg bg-white p-6 shadow-sm">
                        <p class="text-sm text-gray-500">Concluídos</p>
                        <p class="mt-2 text-3xl font-semibold text-emerald-600">
                            {{ stats.por_status.concluido }}
                        </p>
                    </div>
                    <div class="rounded-lg bg-white p-6 shadow-sm">
                        <p class="text-sm text-gray-500">Pendentes / processando</p>
                        <p class="mt-2 text-3xl font-semibold text-amber-600">
                            {{ stats.por_status.pendente + stats.por_status.processando }}
                        </p>
                    </div>
                </div>

                <div class="overflow-hidden rounded-lg bg-white shadow-sm">
                    <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                        <h3 class="font-medium text-gray-900">Pedidos recentes</h3>
                        <Link
                            :href="route('pedidos.create')"
                            class="rounded-md bg-gray-800 px-3 py-2 text-sm text-white hover:bg-gray-700"
                        >
                            Novo pedido
                        </Link>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200 text-sm">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left font-medium text-gray-500">ID</th>
                                    <th class="px-6 py-3 text-left font-medium text-gray-500">Cliente</th>
                                    <th class="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                                    <th class="px-6 py-3 text-left font-medium text-gray-500">Itens</th>
                                    <th class="px-6 py-3 text-left font-medium text-gray-500">Total</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                <tr v-for="pedido in recentes" :key="pedido.id">
                                    <td class="px-6 py-3">
                                        <Link
                                            :href="route('pedidos.show', pedido.id)"
                                            class="text-indigo-600 hover:underline"
                                        >
                                            #{{ pedido.id }}
                                        </Link>
                                    </td>
                                    <td class="px-6 py-3">{{ pedido.cliente }}</td>
                                    <td class="px-6 py-3 capitalize">{{ pedido.status }}</td>
                                    <td class="px-6 py-3">{{ pedido.items_count }}</td>
                                    <td class="px-6 py-3">{{ formatMoney(pedido.total) }}</td>
                                </tr>
                                <tr v-if="!recentes.length">
                                    <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                                        Nenhum pedido ainda. Crie o primeiro.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
