import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ relatorios }) {
    const gerar = () => {
        router.post(route('relatorios.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Relatórios
                    </h2>
                    <button
                        type="button"
                        className="rounded-md bg-gray-800 px-3 py-2 text-sm text-white hover:bg-gray-700"
                        onClick={gerar}
                    >
                        Gerar Excel (fila)
                    </button>
                </div>
            }
        >
            <Head title="Relatórios" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500">
                                        Tipo
                                    </th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500">
                                        Concluído
                                    </th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500">
                                        Ação
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {relatorios.data.map((relatorio) => (
                                    <tr key={relatorio.id}>
                                        <td className="px-6 py-3">
                                            #{relatorio.id}
                                        </td>
                                        <td className="px-6 py-3">
                                            {relatorio.tipo}
                                        </td>
                                        <td className="px-6 py-3 capitalize">
                                            {relatorio.status}
                                        </td>
                                        <td className="px-6 py-3">
                                            {relatorio.concluido_em || '—'}
                                        </td>
                                        <td className="px-6 py-3">
                                            {relatorio.status === 'concluido' ? (
                                                <a
                                                    href={route(
                                                        'relatorios.download',
                                                        relatorio.id,
                                                    )}
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    Download
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {!relatorios.data.length && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-8 text-center text-gray-500"
                                        >
                                            Nenhum relatório. Gere o primeiro via
                                            fila Redis.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
