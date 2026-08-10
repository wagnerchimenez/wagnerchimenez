import { Head, Link } from '@inertiajs/react';

const features = [
    {
        title: 'Pedidos com filas',
        body: 'Crie pedidos com itens, acompanhe status e dispare processamento assíncrono via Redis.',
    },
    {
        title: 'Relatórios Excel',
        body: 'Gere planilhas em background, consulte o status do job e faça download quando concluir.',
    },
    {
        title: 'Dashboard operacional',
        body: 'Veja totais, distribuição por status e os pedidos mais recentes em um só lugar.',
    },
    {
        title: 'Health check',
        body: 'Endpoint /api/saude verifica banco, Redis e fila — útil para monitorar a infra.',
    },
];

const stack = [
    'PHP 8',
    'Laravel',
    'Inertia.js',
    'React',
    'Tailwind CSS',
    'PostgreSQL',
    'Redis',
    'Pest',
    'Docker',
];

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Gestão de Pedidos" />

            <div className="min-h-screen bg-slate-950 text-slate-100">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(ellipse_at_top,_rgba(45,212,191,0.18),_transparent_55%)]" />

                <header className="relative z-10 border-b border-white/10">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400 text-sm font-bold text-slate-950">
                                GP
                            </div>
                            <div>
                                <p className="text-sm font-semibold tracking-wide text-white">
                                    Gestão de Pedidos
                                </p>
                                <p className="text-xs text-slate-400">
                                    Showcase Full Stack Sênior
                                </p>
                            </div>
                        </div>

                        <nav className="flex items-center gap-2 text-sm">
                            <a
                                href="/api/saude"
                                className="hidden rounded-md px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white sm:inline-block"
                            >
                                Saúde da API
                            </a>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md bg-teal-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-teal-300"
                                >
                                    Abrir dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
                                    >
                                        Entrar
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-teal-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-teal-300"
                                    >
                                        Criar conta
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="relative z-10">
                    <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pt-24">
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-300/90">
                            Laravel · React · Inertia
                        </p>
                        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-tight">
                            Gestão de Pedidos
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
                            Aplicação demonstrativa para evidenciar arquitetura
                            full stack com filas Redis, relatórios assíncronos,
                            testes automatizados e ambiente Docker — o mesmo
                            tipo de stack usado em SaaS e e-commerce.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
                                >
                                    Ir para o dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
                                    >
                                        Acessar demo
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                                    >
                                        Registrar
                                    </Link>
                                </>
                            )}
                            <a
                                href="https://github.com/wagnerchimenez/wagnerchimenez/tree/main/gestao-pedidos-laravel"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-md px-5 py-3 text-sm font-medium text-slate-300 transition hover:text-white"
                            >
                                Ver código no GitHub →
                            </a>
                        </div>

                        {!auth.user && (
                            <p className="mt-4 text-sm text-slate-400">
                                Login demo:{' '}
                                <span className="font-medium text-slate-200">
                                    demo@gestao-pedidos.test
                                </span>{' '}
                                /{' '}
                                <span className="font-medium text-slate-200">
                                    password
                                </span>
                            </p>
                        )}
                    </section>

                    <section className="border-y border-white/10 bg-white/[0.02]">
                        <div className="mx-auto max-w-6xl px-6 py-10">
                            <p className="text-sm text-slate-400">
                                Stack do projeto
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {stack.map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-md border border-white/10 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-200"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-6xl px-6 py-16">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl font-semibold text-white">
                                O que você encontra neste showcase
                            </h2>
                            <p className="mt-3 text-slate-300">
                                Fluxos reais de produto — não só um CRUD —
                                pensados para entrevistas técnicas e revisão de
                                código.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-5 sm:grid-cols-2">
                            {features.map((feature) => (
                                <article
                                    key={feature.title}
                                    className="rounded-xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-teal-400/30"
                                >
                                    <h3 className="text-lg font-semibold text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                                        {feature.body}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="mx-auto max-w-6xl px-6 pb-20">
                        <div className="overflow-hidden rounded-2xl border border-teal-400/20 bg-gradient-to-br from-teal-400/10 via-slate-900 to-slate-900 p-8 sm:p-10">
                            <h2 className="text-2xl font-semibold text-white">
                                Pronto para explorar
                            </h2>
                            <p className="mt-3 max-w-2xl text-slate-300">
                                Entre com a conta demo, crie um pedido e
                                acompanhe o processamento na fila. Em seguida,
                                gere um relatório Excel e consulte o health
                                check da infraestrutura.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    href={
                                        auth.user
                                            ? route('dashboard')
                                            : route('login')
                                    }
                                    className="rounded-md bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
                                >
                                    {auth.user
                                        ? 'Abrir dashboard'
                                        : 'Começar agora'}
                                </Link>
                                <Link
                                    href={
                                        auth.user
                                            ? route('pedidos.create')
                                            : route('register')
                                    }
                                    className="rounded-md border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/5"
                                >
                                    {auth.user
                                        ? 'Criar pedido'
                                        : 'Criar minha conta'}
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="relative z-10 border-t border-white/10">
                    <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            Wagner Lima Chimenez · showcase open-source para
                            vagas Full Stack
                        </p>
                        <p>
                            Laravel v{laravelVersion} · PHP v{phpVersion}
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
