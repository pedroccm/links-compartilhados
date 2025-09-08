# 🔧 Comandos Úteis

## 🚀 Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm run start

# Verificar código (lint)
npm run lint

# Corrigir problemas de lint
npm run lint -- --fix
```

---

## 📦 Gerenciar Componentes Shadcn/UI

```bash
# Adicionar novos componentes
npx shadcn@latest add [component-name]

# Exemplos:
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

---

## 🗄️ Supabase

```bash
# Instalar CLI do Supabase (global)
npm install -g supabase

# Verificar versão
supabase --version

# Inicializar projeto local
supabase init

# Fazer login no Supabase
supabase login

# Gerar types TypeScript
supabase gen types typescript --project-id [PROJECT_ID] > src/types/supabase.ts
```

---

## 🔄 Git

```bash
# Status dos arquivos
git status

# Adicionar arquivos
git add .

# Commit
git commit -m "feat: adicionar nova funcionalidade"

# Push
git push

# Verificar histórico
git log --oneline
```

---

## 🛠️ Troubleshooting

### Problemas Comuns:

#### 1. Porta em uso
```bash
# Se a porta 3000 estiver ocupada
# O Next.js automaticamente usa 3001, 3002, etc.

# Ou force uma porta específica:
npm run dev -- -p 3002
```

#### 2. Cache problems
```bash
# Limpar cache do Next.js
rm -rf .next

# Reinstalar node_modules
rm -rf node_modules package-lock.json
npm install
```

#### 3. Problemas de TypeScript
```bash
# Verificar erros de tipos
npx tsc --noEmit

# Regenerar types do Supabase
supabase gen types typescript --project-id [PROJECT_ID] > src/types/supabase.ts
```

#### 4. Problemas de ESLint
```bash
# Corrigir automaticamente
npm run lint -- --fix

# Ignorar regras específicas (no arquivo)
// eslint-disable-next-line [rule-name]
```

---

## 🌐 URLs Importantes

- **Desenvolvimento**: http://localhost:3001
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Documentação Next.js**: https://nextjs.org/docs
- **Documentação Shadcn/UI**: https://ui.shadcn.com/docs

---

## 📊 Logs e Debug

```bash
# Logs do servidor Next.js
# Aparece automaticamente no terminal quando roda npm run dev

# Para ver logs detalhados do Supabase, adicione no código:
console.log('Supabase response:', data, error)

# Verificar network tab no navegador para APIs
# F12 → Network → XHR/Fetch
```

---

## 🔥 Comandos Rápidos

```bash
# Setup completo em um projeto novo
npm install
npm run dev

# Adicionar novo componente Shadcn
npx shadcn@latest add [nome]

# Commit rápido
git add . && git commit -m "update" && git push

# Restart servidor
# Ctrl+C (parar) → npm run dev (iniciar)
```

---

## 🎯 Produtividade

### Extensões VSCode Recomendadas:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense  
- TypeScript Importer
- Auto Rename Tag
- Prettier - Code formatter
- GitLens — Git supercharged

### Atalhos Úteis:
- `Ctrl + Shift + P` → Command Palette
- `Ctrl + \`` → Terminal integrado
- `Ctrl + P` → Quick file search
- `Alt + Shift + F` → Format document