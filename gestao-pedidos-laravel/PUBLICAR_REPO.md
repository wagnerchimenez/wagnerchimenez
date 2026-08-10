# Como publicar este showcase em um repositório próprio

O ambiente do agente só consegue fazer push no profile README (`wagnerchimenez/wagnerchimenez`). Crie o repo vazio na UI do GitHub e rode:

```bash
cd gestao-pedidos-laravel
git init
git config user.name "Wagner"
git config user.email "wagnerllchimenez.comp@gmail.com"
git add .
git commit -m "Showcase Full Stack: Laravel + Inertia/Vue, filas Redis, Pest, Docker e CI"
git branch -M main
git remote add origin git@github.com:wagnerchimenez/gestao-pedidos-laravel.git
git push -u origin main
```

Depois: pin o repo no perfil e atualize o link no README raiz.
