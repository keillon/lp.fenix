/**
 * Modelo de Lead para armazenamento de potenciais clientes
 * 
 * Este modelo define a estrutura dos leads capturados pelo sistema,
 * incluindo dados pessoais e de contato.
 */
const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  // Nome do lead - campo obrigatório
  nome: {
    type: String,
    required: true,
    trim: true // Remove espaços extras no início e fim
  },
  
  // Email do lead - campo obrigatório
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true // Normaliza para minúsculas
  },
  
  // Telefone do lead - campo obrigatório com formatação automática
  telefone: {
    type: String,
    required: true,
    // Função 'set' manipula o valor antes de salvá-lo no banco
    set: function(value) {
      if (!value) return '';
      
      // Remove tudo que não for dígito
      let telefoneLimpo = value.toString().replace(/\D/g, '');
      
      // Garante que comece com '55' (código do Brasil)
      if (!telefoneLimpo.startsWith('55')) {
        telefoneLimpo = '55' + telefoneLimpo;
      }
      
      return telefoneLimpo;
    }
  },
  
  // CNPJ do lead - campo opcional com valor padrão vazio
  cnpj: {
    type: String,
    required: false,
    default: '', // Valor padrão vazio para evitar undefined
    trim: true,
    // Adiciona um formatador para garantir que o CNPJ seja salvo corretamente
    set: function(value) {
      if (!value) return '';
      
      // Remove tudo que não for dígito
      return value.toString().replace(/[^\d]/g, '');
    }
  },
  
  // Mensagem enviada pelo lead - campo opcional com valor padrão vazio
  mensagem: {
    type: String,
    required: false,
    default: '', // Valor padrão vazio para evitar undefined
    trim: true
  },
  
  // Pedido do lead - campo opcional que pode conter diferentes tipos de dados
  pedido: {
    type: mongoose.Schema.Types.Mixed,
    default: '',
    get: function(value) {
      // Garantir que nunca retorne null
      return value || '';
    }
  },
  
  // Campo para controlar se o lead foi atendido
  atendido: {
    type: Boolean,
    default: false
  }
}, 
// Adiciona timestamps (createdAt, updatedAt) automaticamente
{ 
  timestamps: true,
  // Garantir que getters sejam aplicados quando convertido para objeto/JSON
  toJSON: { getters: true },
  toObject: { getters: true }
});

// Removido o índice único para permitir múltiplos cadastros do mesmo usuário
// LeadSchema.index({ email: 1, telefone: 1 }, { unique: true });

module.exports = mongoose.model('Lead', LeadSchema);