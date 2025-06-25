# Dockerfile otimizado para frontend Next.js
FROM node:18-alpine AS builder

# Configurações de ambiente para otimizar o build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Instalar dependências necessárias para o Sharp
RUN apk add --no-cache vips-dev python3 make g++

# Habilitar o cache do pnpm para acelerar builds futuros
RUN corepack enable

WORKDIR /app

# Copiar apenas os arquivos necessários para instalar dependências
COPY package.json pnpm-lock.yaml* ./

# Instalar dependências utilizando pnpm (com cache eficiente)
RUN pnpm install --no-frozen-lockfile

# Copiar o restante dos arquivos do projeto
COPY . .

# Criar arquivos .env se não existirem para prevenir erros (apenas para build)
RUN touch .env.local || true

# Build otimizado da aplicação Next.js com output 'standalone'
RUN pnpm build

# ---- ESTÁGIO DE PRODUÇÃO ----
FROM node:18-alpine AS runner

# Definir variáveis de ambiente para produção
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Criar diretório de aplicação com permissões adequadas
WORKDIR /app

# Adicionar um usuário não-root para executar a aplicação
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nextjs

# Copiar apenas os diretórios e arquivos necessários para executar a aplicação
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Definir permissões adequadas para os arquivos
RUN chmod -R 550 .next && \
    chown -R nextjs:nodejs .next public

# Usar o usuário não-root para segurança
USER nextjs

# Expor a porta da aplicação
EXPOSE 3000

# Configurar variáveis de ambiente para o servidor
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para iniciar o servidor standalone do Next.js
CMD ["node", "server.js"]