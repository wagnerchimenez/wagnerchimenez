<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, router } from '@inertiajs/vue3';

defineProps({
    relatorios: { type: Object, required: true },
});

const gerar = () => {
    router.post(route('relatorios.store'));
};
</script>

<template>
    <Head title="Relatórios" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold leading-tight text-gray-800">Relatórios</h2>
                <button
                    type="button"
                    class="rounded-md bg-gray-800 px-3 py-2 text-sm text-white hover:bg-gray-700"
                    @click="gerar"
                >
                    Gerar Excel (fila)
                </button>
            </div>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden rounded-lg bg-white shadow-sm">
                    <table class="min-w-full divide-y divide-gray-200 text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left font-medium text-gray-500">ID</th>
                                <th class="px-6 py-3 text-left font-medium text-gray-500">Tipo</th>
                                <th class="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                                <th class="px-6 py-3 text-left font-medium text-gray-500">Concluído</th>
                                <th class="px-6 py-3 text-left font-medium text-gray-500">Ação</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="relatorio in relatorios.data" :key="relatorio.id">
                                <td class="px-6 py-3">#{{ relatorio.id }}</td>
                                <td class="px-6 py-3">{{ relatorio.tipo }}</td>
                                <td class="px-6 py-3 capitalize">{{ relatorio.status }}</td>
                                <td class="px-6 py-3">{{ relatorio.concluido_em || '—' }}</td>
                                <td class="px-6 py-3">
                                    <a
                                        v-if="relatorio.status === 'concluido'"
                                        :href="route('relatorios.download', relatorio.id)"
                                        class="text-indigo-600 hover:underline"
                                    >
                                        Download
                                    </a>
                                    <span v-else class="text-gray-400">—</span>
                                </td>
                            </tr>
                            <tr v-if="!relatorios.data.length">
                                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                                    Nenhum relatório. Gere o primeiro via fila Redis.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
