import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const formatMoney = (value) =>
    Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

export default function Index({ pedidos, filtros = {} }) {
    const [status, setStatus] = useState(filtros.status || '');

    useEffect(() => {
        setStatus(filtros.status || '');
    }, [filtros.status]);

    const onStatusChange = (event) => {
        const value = event.target.value;
        setStatus(value);
        router.get(
            route('pedidos.index'),
            { status: value || undefined },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Pedidos
                    </h2>
                    <Link
                        href={route('pedidos.create')}
                        className="rounded-md bg-gray-800 px-3 py-2 text-sm text-white hover:bg-gray-700"
                    >
                        Novo pedido
                    </Link>
                </div>
            }
        >
            <Head title="Pedidos" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-4 shadow-sm">
                        <label className="text-sm text-gray-600">
                            Filtrar por status
                        </label>
                        <select
                            value={status}
                            onChange={onStatusChange}
                            className="mt-1 block w-full max-w-xs rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Todos</option>
                            <option value="pendente">Pendente</option>
                            <option value="processando">Processando</option>
                            <option value="concluido">Concluído</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500">
                                        Cliente
                                    </th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500">
                                        Itens
                                    </th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pedidos.data.map((pedido) => (
                                    <tr key={pedido.id}>
                                        <td className="px-6 py-3">
                                            <Link
                                                href={route(
                                                    'pedidos.show',
                                                    pedido.id,
                                                )}
                                                className="text-indigo-600 hover:underline"
                                            >
                                                #{pedido.id}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-3">
                                            {pedido.cliente}
                                        </td>
                                        <td className="px-6 py-3 capitalize">
                                            {pedido.status}
                                        </td>
                                        <td className="px-6 py-3">
                                            {pedido.items?.length || 0}
                                        </td>
                                        <td className="px-6 py-3">
                                            {formatMoney(pedido.total)}
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
