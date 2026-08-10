import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        cliente: '',
        items: [{ produto: '', quantidade: 1, preco_unitario: 10 }],
    });

    const addItem = () => {
        setData('items', [
            ...data.items,
            { produto: '', quantidade: 1, preco_unitario: 10 },
        ]);
    };

    const removeItem = (index) => {
        if (data.items.length <= 1) {
            return;
        }
        setData(
            'items',
            data.items.filter((_, i) => i !== index),
        );
    };

    const updateItem = (index, field, value) => {
        const items = data.items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item,
        );
        setData('items', items);
    };

    const submit = (event) => {
        event.preventDefault();
        post(route('pedidos.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Novo pedido
                </h2>
            }
        >
            <Head title="Novo pedido" />

            <div className="py-8">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <form
                        onSubmit={submit}
                        className="space-y-6 rounded-lg bg-white p-6 shadow-sm"
                    >
                        <div>
                            <InputLabel htmlFor="cliente" value="Cliente" />
                            <TextInput
                                id="cliente"
                                className="mt-1 block w-full"
                                value={data.cliente}
                                onChange={(e) =>
                                    setData('cliente', e.target.value)
                                }
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={errors.cliente}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-gray-900">
                                    Itens
                                </h3>
                                <button
                                    type="button"
                                    className="text-sm text-indigo-600 hover:underline"
                                    onClick={addItem}
                                >
                                    + adicionar item
                                </button>
                            </div>

                            {data.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid gap-3 rounded-md border border-gray-200 p-4 sm:grid-cols-4"
                                >
                                    <div className="sm:col-span-2">
                                        <InputLabel
                                            value={`Produto #${index + 1}`}
                                        />
                                        <TextInput
                                            className="mt-1 block w-full"
                                            value={item.produto}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    'produto',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Qtd" />
                                        <TextInput
                                            type="number"
                                            min="1"
                                            className="mt-1 block w-full"
                                            value={item.quantidade}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    'quantidade',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <InputLabel value="Preço unitário" />
                                        <TextInput
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            className="mt-1 block w-full"
                                            value={item.preco_unitario}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    'preco_unitario',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="text-left text-sm text-red-600 hover:underline sm:col-span-4"
                                        onClick={() => removeItem(index)}
                                    >
                                        Remover item
                                    </button>
                                </div>
                            ))}
                            <InputError message={errors.items} />
                        </div>

                        <PrimaryButton disabled={processing}>
                            Criar e enfileirar processamento
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
