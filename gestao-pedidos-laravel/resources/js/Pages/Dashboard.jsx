import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const formatMoney = (value) =>
    Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

export default function Dashboard({ stats, recentes = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard de Pedidos
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">Total de pedidos</p>
                            <p className="mt-2 text-3xl font-semibold text-gray-900">
                                {stats.quantidade}
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">Valor total</p>
                            <p className="mt-2 text-3xl font-semibold text-gray-900">
                                {formatMoney(stats.valor_total)}
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">Concluídos</p>
                            <p className="mt-2 text-3xl font-semibold text-emerald-600">
                                {stats.por_status.concluido}
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Pendentes / processando
                            </p>
                            <p className="mt-2 text-3xl font-semibold text-amber-600">
                                {stats.por_status.pendente +
                                    stats.por_status.processando}
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                            <h3 className="font-medium text-gray-900">
                                Pedidos recentes
                            </h3>
                            <Link
                                href={route('pedidos.create')}
                                className="rounded-md bg-gray-800 px-3 py-2 text-sm text-white hover:bg-gray-700"
                            >
                                Novo pedido
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
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
                                    {recentes.map((pedido) => (
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
                                                {pedido.items_count}
                                            </td>
                                            <td className="px-6 py-3">
                                                {formatMoney(pedido.total)}
                                            </td>
                                        </tr>
                                    ))}
                                    {!recentes.length && (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-8 text-center text-gray-500"
                                            >
                                                Nenhum pedido ainda. Crie o
                                                primeiro.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
