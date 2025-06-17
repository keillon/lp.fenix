#!/bin/bash
# deploy.sh - Script de deployment automatizado para produção

# Cores para outputs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções auxiliares
log_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

log_error() {
  echo -e "${RED}✗ $1${NC}"
  exit 1
}

log_info() {
  echo -e "${BLUE}ℹ $1${NC}"
}

log_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

# Verifica se o Docker está instalado
if ! command -v docker &> /dev/null; then
  log_error "Docker não está instalado. Por favor, instale o Docker primeiro."
fi

# Verifica se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
  log_error "Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
fi

# Início do deployment
log_info "Iniciando o processo de deployment..."

# Verifica se os arquivos necessários existem
if [ ! -f "docker-compose.yml" ]; then
  log_error "Arquivo docker-compose.yml não encontrado."
fi

# Verifica se os diretórios do projeto existem
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
  log_error "Estrutura de diretórios do projeto não encontrada."
fi

# Backup do banco de dados (se o container estiver rodando)
if docker ps | grep -q "mongo"; then
  log_info "Realizando backup do banco de dados..."
  TIMESTAMP=$(date +%Y%m%d_%H%M%S)
  BACKUP_DIR="./backups"
  mkdir -p $BACKUP_DIR
  docker exec $(docker ps -q -f name=mongo) mongodump --uri="mongodb://appuser:password123@195.35.40.86:27017/LpFenix?authSource=admin" --archive > "$BACKUP_DIR/mongodb_backup_$TIMESTAMP.archive"
  log_success "Backup salvo em $BACKUP_DIR/mongodb_backup_$TIMESTAMP.archive"
else
  log_info "Container MongoDB não está rodando. Pulando backup."
fi

# Parar e remover containers existentes
log_info "Parando containers existentes..."
docker-compose down

# Limpar imagens antigas (opcional)
log_info "Removendo imagens antigas..."
docker image prune -af --filter "until=24h"

# Verificar se há atualizações de código (se for um repositório git)
if [ -d ".git" ]; then
  log_info "Verificando atualizações do repositório..."
  git pull
  log_success "Código atualizado."
fi

# Construir e iniciar os containers
log_info "Construindo e iniciando os containers..."
docker-compose up -d --build

# Verificar se os containers estão rodando
log_info "Verificando status dos containers..."
sleep 15  # Aguarda um tempo para os containers iniciarem completamente

FRONTEND_RUNNING=$(docker-compose ps | grep frontend | grep "Up" | wc -l)
BACKEND_RUNNING=$(docker-compose ps | grep backend | grep "Up" | wc -l)
MONGO_RUNNING=$(docker-compose ps | grep mongo | grep "Up" | wc -l)

if [ $FRONTEND_RUNNING -eq 1 ]; then
  log_success "Container do Frontend está rodando"
else
  log_error "Container do Frontend NÃO está rodando"
fi

if [ $BACKEND_RUNNING -eq 1 ]; then
  log_success "Container do Backend está rodando"
else
  log_error "Container do Backend NÃO está rodando"
fi

if [ $MONGO_RUNNING -eq 1 ]; then
  log_success "Container do MongoDB está rodando"
else
  log_error "Container do MongoDB NÃO está rodando"
fi

# Verificar logs para erros (últimos 50 logs)
log_info "Verificando logs recentes para erros..."
FRONTEND_ERRORS=$(docker-compose logs --tail=50 frontend | grep -i "error" | wc -l)
BACKEND_ERRORS=$(docker-compose logs --tail=50 backend | grep -i "error" | wc -l)

if [ $FRONTEND_ERRORS -gt 0 ]; then
  log_warning "Encontrados $FRONTEND_ERRORS possíveis erros nos logs do Frontend. Verifique com 'docker-compose logs frontend'"
fi

if [ $BACKEND_ERRORS -gt 0 ]; then
  log_warning "Encontrados $BACKEND_ERRORS possíveis erros nos logs do Backend. Verifique com 'docker-compose logs backend'"
fi

# Verificar se as aplicações estão respondendo
log_info "Verificando resposta das aplicações..."

# Frontend
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "Falha")
if [ "$FRONTEND_STATUS" = "200" ] || [ "$FRONTEND_STATUS" = "304" ]; then
  log_success "Frontend está respondendo (HTTP $FRONTEND_STATUS)"
else
  log_warning "Frontend não está respondendo corretamente (HTTP $FRONTEND_STATUS)"
fi

# Backend
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health || echo "Falha")
if [ "$BACKEND_STATUS" = "200" ] || [ "$BACKEND_STATUS" = "304" ]; then
  log_success "Backend está respondendo (HTTP $BACKEND_STATUS)"
else
  log_warning "Backend não está respondendo corretamente (HTTP $BACKEND_STATUS)"
  log_info "Verificando logs detalhados do backend..."
  docker-compose logs --tail=30 backend
fi

# Mostrar uso de recursos
log_info "Uso de recursos dos containers:"
docker stats --no-stream

# Informações do sistema
log_info "Informações do sistema:"
docker system df

# Deployment concluído
log_success "Deployment concluído com sucesso!"
log_info "Frontend: http://localhost:3000"
log_info "Backend: http://localhost:5000/api"
log_info "MongoDB: mongodb://localhost:27017"
log_info "Para ver logs use: docker-compose logs -f [frontend|backend|mongo]"
log_info "Para entrar em um container: docker-compose exec [frontend|backend|mongo] sh"