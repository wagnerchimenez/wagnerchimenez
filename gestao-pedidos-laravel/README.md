# Gestão de Pedidos (Laravel + Inertia / React)

Projeto demonstrativo **Full Stack Sênior** para evidenciar capacidade em **PHP 8, Laravel, Inertia.js, React, filas Redis, Pest, Docker e CI** — alinhado a produtos reais em produção (Officina Pro, Salão Elite) e à experiência em e-commerce (Tray).

## Cobertura

| Requisito de mercado | Neste projeto |
| --- | --- |
| PHP 8 + Laravel | Laravel 13 + PHP 8.3 |
| React + Inertia | Breeze + Inertia + React 18 + Tailwind |
| PostgreSQL | Docker Compose (`postgres`) |
| Redis + filas | Queues `pedidos` e `relatorios` |
| Relatório Excel assíncrono | Job + Maatwebsite Excel |
| Dashboard | Totais e pedidos recentes |
| Health check | `GET /api/saude` (DB, Redis, fila) |
| Testes | Pest (feature) |
| Docker | `Dockerfile` + `docker-compose.yml` + worker |
| CI | GitHub Actions (build front + Pest) |

## Stack

- Backend: Laravel, Eloquent, Jobs/Queues, validação, auth (Breeze)
- Frontend: React 18, Inertia.js, Tailwind CSS, Vite
- Dados: PostgreSQL (Compose) / SQLite (testes)
- Async: Redis + `queue:work`
- Qualidade: Pest, Pint (opcional no CI)

## Como rodar (Docker)

```bash
docker compose up --build
```

| Serviço | URL / porta |
| --- | --- |
| App | http://localhost:8080 |
| Health | http://localhost:8080/api/saude |
| Postgres | localhost:5432 |
| Redis | localhost:6379 |

**Login demo (seed):**

- E-mail: `demo@gestao-pedidos.test`
- Senha: `password`

O serviço `worker` processa as filas `pedidos` e `relatorios`.

## Como rodar (local)

```bash
composer install
cp .env.example .env
# Ajuste DB (sqlite ou pgsql) e Redis
php artisan key:generate
php artisan migrate --seed
npm install && npm run build
php artisan serve
php artisan queue:work redis --queue=pedidos,relatorios,default
```

## Módulos

| Módulo | Responsabilidade |
| --- | --- |
| Pedidos | CRUD + itens + status; `ProcessarPedidoJob` na fila |
| Relatórios | Gera Excel em background; download quando concluído |
| Dashboard | Estatísticas agregadas |
| Saúde | JSON com status de infraestrutura |

## Endpoints principais

```
GET    /dashboard
GET    /pedidos
POST   /pedidos
GET    /pedidos/{id}
PATCH  /pedidos/{id}/status
GET    /relatorios
POST   /relatorios
GET    /relatorios/{id}/download
GET    /api/saude
```

## Testes

```bash
php artisan test
```

## Produtos em produção do autor

Além deste showcase open-source:

- [Officina Pro](https://officinapro.com.br) — SaaS Laravel + Inertia (próprio)
- [Salão Elite](https://salaoelite.com.br) — SaaS Laravel + Inertia (próprio)
- [Iguatemi Notícias](https://iguateminoticias.com.br) — portal Laravel (cliente)

## Publicar como repositório dedicado

Ver [PUBLICAR_REPO.md](PUBLICAR_REPO.md).

## Autor

Wagner Lima Chimenez — Full Stack Sênior (PHP / Laravel / React / Inertia)  
https://github.com/wagnerchimenez
