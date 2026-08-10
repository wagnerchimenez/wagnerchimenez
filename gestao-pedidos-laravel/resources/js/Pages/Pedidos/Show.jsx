import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const formatMoney = (value) =>
    Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

export default function Show({ pedido }) {
    const { data, setData, patch, processing } = useForm({
        status: pedido.status,
    });

    const updateStatus = (event) => {
        event.preventDefault();
        patch(route('pedidos.status', pedido.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Pedido #{pedido.id}
                    </h2>
                    <Link
                        href={route('pedidos.index')}
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        Voltar
                    </Link>
                </div>
            }
        >
            <Head title={`Pedido #${pedido.id}`} />

            <div className="py-8">
                <div className="mx-auto max-w-4xl space-y-6 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow-sm">
                        <dl className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm text-gray-500">Cliente</dt>
                                <dd className="mt-1 font-medium">
                                    {pedido.cliente}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">Total</dt>
                                <dd className="mt-1 font-medium">
                                    {formatMoney(pedido.total)}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">
                                    Status atual
                                </dt>
                                <dd className="mt-1 font-medium capitalize">
                                    {pedido.status}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm text-gray-500">
                                    Processado em
                                </dt>
                                <dd className="mt-1 font-medium">
                                    {pedido.processado_em || '—'}
                                </dd>
                            </div>
                        </dl>

                        <form
                            onSubmit={updateStatus}
                            className="mt-6 flex items-end gap-3"
                        >
                            <div>
                                <label className="text-sm text-gray-600">
                                    Alterar status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData('status', e.target.value)
                                    }
                                    className="mt-1 block rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="pendente">Pendente</option>
                                    <option value="processando">
                                        Processando
                                    </option>
                                    <option value="concluido">Concluído</option>
                                    <option value="cancelado">Cancelado</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="rounded-md bg-gray-800 px-3 py-2 text-sm text-white"
                                disabled={processing}
                            >
                                Salvar
                            </button>
                        </form>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                        <div className="border-b border-gray-100 px-6 py-4 font-medium">
                            Itens
                        </div>
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        Produto
                                    </th>
                                    <th className="px-6 py-3 text-left">Qtd</th>
                                    <th className="px-6 py-3 text-left">Preço</th>
                                    <th className="px-6 py-3 text-left">
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pedido.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-6 py-3">
                                            {item.produto}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.quantidade}
                                        </td>
                                        <td className="px-6 py-3">
                                            {formatMoney(item.preco_unitario)}
                                        </td>
                                        <td className="px-6 py-3">
                                            {formatMoney(item.subtotal)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
