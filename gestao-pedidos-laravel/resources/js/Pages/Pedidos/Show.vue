<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const props = defineProps({
    pedido: { type: Object, required: true },
});

const form = useForm({
    status: props.pedido.status,
});

const formatMoney = (value) =>
    Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

const updateStatus = () => {
    form.patch(route('pedidos.status', props.pedido.id));
};
</script>

<template>
    <Head :title="`Pedido #${pedido.id}`" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold leading-tight text-gray-800">
                    Pedido #{{ pedido.id }}
                </h2>
                <Link :href="route('pedidos.index')" class="text-sm text-indigo-600 hover:underline">
                    Voltar
                </Link>
            </div>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">
                <div class="rounded-lg bg-white p-6 shadow-sm">
                    <dl class="grid gap-4 sm:grid-cols-2">
                        <div>
                            <dt class="text-sm text-gray-500">Cliente</dt>
                            <dd class="mt-1 font-medium">{{ pedido.cliente }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm text-gray-500">Total</dt>
                            <dd class="mt-1 font-medium">{{ formatMoney(pedido.total) }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm text-gray-500">Status atual</dt>
                            <dd class="mt-1 font-medium capitalize">{{ pedido.status }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm text-gray-500">Processado em</dt>
                            <dd class="mt-1 font-medium">
                                {{ pedido.processado_em || '—' }}
                            </dd>
                        </div>
                    </dl>

                    <form class="mt-6 flex items-end gap-3" @submit.prevent="updateStatus">
                        <div>
                            <label class="text-sm text-gray-600">Alterar status</label>
                            <select
                                v-model="form.status"
                                class="mt-1 block rounded-md border-gray-300 shadow-sm"
                            >
                                <option value="pendente">Pendente</option>
                                <option value="processando">Processando</option>
                                <option value="concluido">Concluído</option>
                                <option value="cancelado">Cancelado</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            class="rounded-md bg-gray-800 px-3 py-2 text-sm text-white"
                            :disabled="form.processing"
                        >
                            Salvar
                        </button>
                    </form>
                </div>

                <div class="overflow-hidden rounded-lg bg-white shadow-sm">
                    <div class="border-b border-gray-100 px-6 py-4 font-medium">Itens</div>
                    <table class="min-w-full divide-y divide-gray-200 text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left">Produto</th>
                                <th class="px-6 py-3 text-left">Qtd</th>
                                <th class="px-6 py-3 text-left">Preço</th>
                                <th class="px-6 py-3 text-left">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="item in pedido.items" :key="item.id">
                                <td class="px-6 py-3">{{ item.produto }}</td>
                                <td class="px-6 py-3">{{ item.quantidade }}</td>
                                <td class="px-6 py-3">{{ formatMoney(item.preco_unitario) }}</td>
                                <td class="px-6 py-3">{{ formatMoney(item.subtotal) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
