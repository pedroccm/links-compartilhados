# 🗄️ Configuração do Supabase

## 📋 Passo a Passo para Configurar o Banco

### 1️⃣ Criar Projeto no Supabase

1. Acesse https://supabase.com
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Escolha um nome: `links-compartilhados`
5. Selecione a região mais próxima
6. Aguarde a criação (2-3 minutos)

### 2️⃣ Obter Credenciais

1. Vá para **Settings** → **API**
2. Copie as seguintes informações:
   - **Project URL**
   - **anon/public key**
   - **service_role key**

### 3️⃣ Configurar Variáveis de Ambiente

Já estão configuradas no `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://yyfealwxpebzezfximhg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4️⃣ Executar Schema SQL

1. No Supabase, vá para **SQL Editor**
2. Clique em "New Query"
3. Cole o conteúdo do arquivo `database-schema.sql`
4. Execute a query
5. Verifique se as tabelas foram criadas em **Database** → **Tables**

### 5️⃣ Configurar Autenticação

1. Vá para **Authentication** → **Settings**
2. Configure:
   - **Site URL**: `http://localhost:3001` (desenvolvimento)
   - **Redirect URLs**: `http://localhost:3001/auth/callback`
3. Desabilite **"Enable email confirmations"** para desenvolvimento

---

## 🏗️ Schema do Banco (Resumo)

### Tabelas Principais:

- **`lc_links`** - Links compartilhados
- **`lc_categories`** - Categorias de organização
- **`lc_link_categories`** - Relacionamento many-to-many
- **`lc_user_preferences`** - Preferências do usuário
- **`lc_user_actions`** - Auditoria de ações
- **`lc_url_metadata_cache`** - Cache de metadados

### Funcionalidades:
- ✅ **Row Level Security (RLS)** configurado
- ✅ **Índices otimizados** para performance
- ✅ **Full-text search** em português
- ✅ **Triggers automáticos** para timestamps
- ✅ **Validações** de dados

---

## ✅ Status da Configuração

- ✅ Projeto Supabase criado
- ✅ Credenciais configuradas
- ✅ Schema SQL pronto para execução
- ✅ Configurações de auth definidas
- ✅ Cliente Supabase implementado no código

**Pronto para uso!** 🎯