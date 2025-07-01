/**
 * Servidor principal da API Fênix Telecom
 * 
 * Este arquivo configura e inicializa o servidor Express com as rotas
 * da API, middlewares de segurança e conexão com o banco de dados.
 */

// 1. Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// 2. Importação de dependências
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// 3. Conexão com o MongoDB via Mongoose
const connectDB = require('./config/db');

// 4. Importa os módulos de rotas
const adminRoutes = require('./routes/adminRoutes');        // Rotas de administração
const leadsRoutes = require('./routes/leadsRoutes');        // Rotas para leads
const whatsappRoutes = require('./routes/whatsappRoutes');  // Rotas para WhatsApp

// 5. Inicializa a aplicação Express
const app = express();

// 6. Configura CORS para aceitar requisições de origens confiáveis
app.use(cors({
  origin: ['http://localhost:3000', 'https://lp.fenixtelecom.com.br', process.env.FRONTEND_URL].filter(Boolean),
  credentials: true
}));

// 7. Helmet para aumentar a segurança dos cabeçalhos HTTP
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// 8. Morgan para logs das requisições (modo 'combined' para produção)
const logMode = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(logMode));

// 9. Parser para JSON no corpo das requisições (aumentando o limite para conteúdos maiores)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 10. Middleware para registrar todas as requisições (para debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 11. Conecta ao MongoDB
connectDB()
  .then(() => {
    console.log('[INFO] Conexão com o MongoDB estabelecida com sucesso!');
  })
  .catch((err) => {
    console.error('[ERROR] Erro na conexão com o MongoDB:', err);
    process.exit(1);
  });

// 12. Rotas de teste e health check
app.get('/', (req, res) => {
  res.send('API Fênix Telecom - funcionando!');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development',
    database: 'connected'
  });
});

// CORREÇÃO: Rota pública para formulário do site
app.post('/api/leads', async (req, res) => {
  console.log('[INFO] Recebendo lead do formulário público');
  try {
    // Extraimos os dados do request (suporte para ambos padrões de nomes)
    let nome = req.body.nome || req.body.name;
    let email = req.body.email;
    let telefone = req.body.telefone || req.body.phone;
    let cnpj = req.body.cnpj;
    let mensagem = req.body.mensagem || req.body.message;
    
    // Se não tiver os campos obrigatórios, retorna erro
    if (!nome || !email || !telefone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nome, email e telefone são campos obrigatórios' 
      });
    }
    
    // Formata o telefone e CNPJ
    telefone = telefone ? telefone.replace(/\D/g, '') : '';
    if (telefone && !telefone.startsWith('55')) {
      telefone = '55' + telefone;
    }
    
    cnpj = cnpj ? cnpj.replace(/[^\d]/g, '') : '';
    mensagem = mensagem || '';
    
    // Busca o modelo Lead
    const Lead = require('./models/Lead');
    
    // Cria um novo lead
    const newLead = new Lead({ nome, email, telefone, cnpj, mensagem });
    await newLead.save();
    
    // Retorna sucesso
    return res.status(201).json({ 
      success: true, 
      message: 'Lead recebido com sucesso'
    });
  } catch (error) {
    console.error('[ERROR] Erro ao processar lead público:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Não foi possível processar sua solicitação. Por favor, tente novamente mais tarde.'
    });
  }
});

// CORREÇÃO: Rota para WhatsApp
app.post('/api/whatsapp/send', async (req, res) => {
  console.log('[INFO] Recebendo requisição para envio de WhatsApp');
  try {
    // Extrair dados com diferentes nomes possíveis
    const phone = req.body.phone || req.body.telefone;
    const message = req.body.message || req.body.mensagem;
    const name = req.body.name || req.body.nome;
    
    console.log('[DEBUG] Dados recebidos WhatsApp:', req.body);
    
    // Validação básica
    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Telefone é obrigatório'
      });
    }
    
    // Formata o telefone
    let phoneNumber = phone.replace(/\D/g, '');
    if (!phoneNumber.startsWith('55')) {
      phoneNumber = '55' + phoneNumber;
    }
    
    // Constrói mensagem personalizada se tiver nome
    let textMessage = message || 'Olá, gostaria de mais informações sobre a Fênix Telecom.';
    if (name && !message) {
      textMessage = `Olá, meu nome é ${name}. Gostaria de mais informações sobre a Fênix Telecom.`;
    }
    
    // Cria a URL para o WhatsApp Web
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textMessage)}`;
    
    // Retorna a URL
    return res.status(200).json({
      success: true,
      whatsappUrl
    });
  } catch (error) {
    console.error('[ERROR] Erro ao processar requisição WhatsApp:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar mensagem'
    });
  }
});

// 13. Montagem das rotas principais
// Unificamos as rotas dos leads sob a rota /api/admin/leads
app.use('/api/admin/leads', leadsRoutes);

// Rotas de administração (registro, login, etc.)
app.use('/api/admin', adminRoutes);

// Rotas para integração com WhatsApp
app.use('/api/whatsapp', whatsappRoutes);

// 14. Middleware para tratar rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada.'
  });
});

// 15. Middleware para tratamento de erros genérico
app.use((err, req, res, next) => {
  console.error('[ERROR] Erro inesperado no servidor:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno no servidor.'
  });
});

// 16. Inicializa o servidor na porta definida no .env ou 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[INFO] Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV || 'development'}`);
});

// Tratamento para encerramento gracioso do servidor
process.on('SIGTERM', () => {
  console.log('[INFO] Sinal SIGTERM recebido. Encerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('[INFO] Sinal SIGINT recebido. Encerrando servidor...');
  process.exit(0);
});