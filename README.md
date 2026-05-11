# Green Field Dashboard

Painel administrativo construído com Next.js, React 19, TypeScript e Tailwind CSS, utilizando Vinext como ferramenta de build (Vite + Next.js).

## Funcionalidades

- **Autenticação** — Login com sessão via cookie (credenciais padrão: `admin` / `admin123`)
- **Dashboard** — Cards de métricas (receita, pedidos, visitantes, taxa de conversão), gráfico SVG de receita mensal e tabela de pedidos recentes
- **Tema** — Suporte a modo claro e escuro, com persistência no `localStorage`
- **Sidebar** — Menu lateral recolhível com navegação
- **Proteção de rotas** — Middleware de proxy redireciona usuários não autenticados para o login

## Tecnologias

- [React 19](https://react.dev/)
- [Next.js](https://nextjs.org/) (via Vinext)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (ícones)
- [Vite](https://vite.dev/) (build tool)

## Estrutura do projeto

```
pages/
  index.tsx          → redireciona para /login
  login.tsx          → página de autenticação
  dashboard.tsx      → painel principal
  _app.tsx           → configuração global do app
  globals.css        → estilos globais (Tailwind)
  api/auth/
    login.ts         → endpoint de login
    logout.ts        → endpoint de logout
proxy.ts             → middleware de proteção de rotas
next.config.ts       → configuração do Vinext/Next.js
tailwind.config.ts   → configuração do Tailwind
```

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm ou pnpm

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O servidor inicia em `http://localhost:3001`.

### Build de produção

```bash
npm run build
```

### Rodar a build

```bash
npm start
```
