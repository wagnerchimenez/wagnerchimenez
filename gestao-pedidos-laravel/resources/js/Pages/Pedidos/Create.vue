<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, useForm } from '@inertiajs/vue3';

const form = useForm({
    cliente: '',
    items: [
        { produto: '', quantidade: 1, preco_unitario: 10 },
    ],
});

const addItem = () => {
    form.items.push({ produto: '', quantidade: 1, preco_unitario: 10 });
};

const removeItem = (index) => {
    if (form.items.length > 1) {
        form.items.splice(index, 1);
    }
};

const submit = () => {
    form.post(route('pedidos.store'));
};
</script>

<template>
    <Head title="Novo pedido" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">Novo pedido</h2>
        </template>

        <div class="py-8">
            <div class="mx-auto max-w-3xl sm:px-6 lg:px-8">
                <form
                    class="space-y-6 rounded-lg bg-white p-6 shadow-sm"
                    @submit.prevent="submit"
                >
                    <div>
                        <InputLabel for="cliente" value="Cliente" />
                        <TextInput
                            id="cliente"
                            v-model="form.cliente"
                            type="text"
                            class="mt-1 block w-full"
                            required
                        />
                        <InputError class="mt-2" :message="form.errors.cliente" />
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <h3 class="font-medium text-gray-900">Itens</h3>
                            <button
                                type="button"
                                class="text-sm text-indigo-600 hover:underline"
                                @click="addItem"
                            >
                                + adicionar item
                            </button>
                        </div>

                        <div
                            v-for="(item, index) in form.items"
                            :key="index"
                            class="grid gap-3 rounded-md border border-gray-200 p-4 sm:grid-cols-4"
                        >
                            <div class="sm:col-span-2">
                                <InputLabel :value="`Produto #${index + 1}`" />
                                <TextInput
                                    v-model="item.produto"
                                    type="text"
                                    class="mt-1 block w-full"
                                    required
                                />
                            </div>
                            <div>
                                <InputLabel value="Qtd" />
                                <TextInput
                                    v-model="item.quantidade"
                                    type="number"
                                    min="1"
                                    class="mt-1 block w-full"
                                    required
                                />
                            </div>
                            <div>
                                <InputLabel value="Preço unitário" />
                                <TextInput
                                    v-model="item.preco_unitario"
                                    type="number"
                                    min="0.01"
                                    step="0.01"
                                    class="mt-1 block w-full"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                class="text-left text-sm text-red-600 hover:underline sm:col-span-4"
                                @click="removeItem(index)"
                            >
                                Remover item
                            </button>
                        </div>
                        <InputError :message="form.errors.items" />
                    </div>

                    <PrimaryButton :disabled="form.processing">
                        Criar e enfileirar processamento
                    </PrimaryButton>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
