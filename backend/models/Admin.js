const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,  // normaliza para minúsculas
    trim: true
  },
  password: {
    type: String,
    required: true
    // Em produção, sempre armazene a senha com hash (por exemplo, usando bcrypt)
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  // Define o papel do usuário: pode ser "admin" ou "service"
  role: {
    type: String,
    enum: ['admin', 'service'],
    default: 'service',  // valor padrão, caso não seja especificado
    required: true
  },
  // Campo opcional para status (ativo/inativo, se necessário)
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, { timestamps: true }); // Cria os campos createdAt e updatedAt automaticamente

module.exports = mongoose.model('Admin', AdminSchema);
