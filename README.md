# aula-deploy-front

Template Next.js (App Router) da aula de deploy — FIAP.

> 🎓 **Aula:** Deploy de verdade: Next.js + API Node
> 🚀 **Deploy alvo:** Vercel
> 🔗 **API que ele consome:** [aula-deploy-api](../api) (deploy no Render)

---

## Comece aqui

1. **Clique em "Use this template"** no topo desta página do GitHub → **Create a new repository**.
2. Clone o seu novo repo:
   ```bash
   git clone https://github.com/<seu-user>/<seu-repo>.git
   cd <seu-repo>
   ```
3. Instale e rode:
   ```bash
   cp .env.example .env.local
   npm install
   npm run dev
   ```
4. Acesse `http://localhost:3000`.

> Pra rodar de verdade você precisa da API também rodando em `http://localhost:3001`. Veja o template [aula-deploy-api](#).

---

## O que tem aqui

```
app/
├── layout.tsx                # Layout root (dark mode simples)
├── page.tsx                  # Lista de produtos — Server Component, revalidate=60
├── produto/[id]/page.tsx     # Detalhe — SSR com revalidate
└── api/health/route.ts       # Healthcheck do Next — runtime: edge
lib/
└── api.ts                    # fetch wrapper tipado
```

**Pontos pra observar durante a aula:**

- `app/page.tsx` usa `export const revalidate = 60` — **ISR** (Incremental Static Regeneration). Cache no servidor, regenera a cada 60s em background.
- `app/api/health/route.ts` declara `runtime = "edge"`. Roda na borda da CDN, não em serverless tradicional. Latência ~3x menor, mas só Web APIs disponíveis.
- `lib/api.ts` lê `NEXT_PUBLIC_API_URL` — variável **pública**, vai pro bundle do browser. Não colocar segredo aqui.

---

## Deploy na Vercel

1. [vercel.com/new](https://vercel.com/new) → **Import** do seu repo no GitHub.
2. Framework detectado: **Next.js**. Não mexer em Build Command.
3. **Environment Variables:**
   - `NEXT_PUBLIC_API_URL` = URL pública da sua API no Render (ex: `https://api-loja-fiap.onrender.com`)
4. **Deploy.**

Cada PR aberto vai gerar uma **Preview URL** automaticamente — comentada no próprio PR pelo bot da Vercel.

---

## CI

`.github/workflows/ci.yml` roda em qualquer PR:

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

Pra ativar a proteção, vá em **Settings → Branches** e adicione branch protection rule pra `main` exigindo o check `quality` passar.

---

## Comandos

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm start          # Roda o build (testa o que vai pra prod)
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

---

## Stack

- Next.js 15 (App Router, Server Components)
- React 19
- TypeScript 5
- ESLint
