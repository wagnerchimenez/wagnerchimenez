<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';

const props = defineProps({
    pedidos: { type: Object, required: true },
    filtros: { type: Object, default: () => ({}) },
});

const status = ref(props.filtros.status || '');

watch(status, (value) => {
    router.get(
        route('pedidos.index'),
        { status: value || undefined },
        { preserveState: true, replace: true },
    );
});

const formatMoney = (value) =>
    Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
</script>

<template>
    <Head title="Pedidos" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold leading-tight text-gray-800">Pedidos</h2>
                <Link
                    :href="route('pedidos.create')"
                    class="rounded-md bg-gray-800 px-3 py-2 text-sm text-white hover:bg-gray-700"
                >
                    Novo pedido
                </Link>
            </div>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
                <div class="rounded-lg bg-white p-4 shadow-sm">
                    <label class="text-sm text-gray-600">Filtrar por status</label>
                    <select
                        v-model="status"
                        class="mt-1 block w-full max-w-xs rounded-md border-gray-300 shadow-sm"
                    >
                        <option value="">Todos</option>
                        <option value="pendente">Pendente</option>
                        <option value="processando">Processando</option>
                        <option value="concluido">Concluído</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </div>

                <div class="overflow-hidden rounded-lg bg-white shadow-sm">
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
                            <tr v-for="pedido in pedidos.data" :key="pedido.id">
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
                                <td class="px-6 py-3">{{ pedido.items?.length || 0 }}</td>
                                <td class="px-6 py-3">{{ formatMoney(pedido.total) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
