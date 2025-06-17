# Dockerfile para backend Node.js
FROM node:18-alpine

# Define variáveis de ambiente
ENV NODE_ENV=production

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependências primeiro
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instala o pnpm e as dependências com configurações de retry
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install -g pnpm pm2 && \
    pnpm config set network-timeout 300000 && \
    pnpm install --frozen-lockfile --prod

# Copia o restante do código
COPY . .

# Cria um usuário não-root para rodar a aplicação
RUN addgroup -g 1001 appgroup && \
    adduser -S -G appgroup appuser && \
    chown -R appuser:appgroup /app

# Configura diretório para logs (se necessário)
RUN mkdir -p /app/logs && \
    chown -R appuser:appgroup /app/logs

# Muda para o usuário não-root
USER appuser

# Expõe a porta do backend
EXPOSE 5000

# Usa pm2-runtime para gerenciar o processo
CMD ["pm2-runtime", "ecosystem.config.js"]