// backend/routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Lead = require('../models/Lead');
const authMiddleware = require('../middleware/auth');

/**
 * Registro de Administrador
 * POST /api/admin/register
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Verifica se o email já está cadastrado
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Email já cadastrado.' });
    }

    // Gera o hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Cria novo admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: role || 'admin'
    });

    await newAdmin.save();
    return res.json({ success: true, message: 'Administrador registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar admin:', error);
    return res.status(500).json({ success: false, message: 'Erro interno' });
  }
});

/**
 * Login de Administrador
 * POST /api/admin/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('[LOGIN] Tentativa de login:', { email });
    
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('[LOGIN] Admin não encontrado:', { email });
      return res.status(400).json({ success: false, message: 'Credenciais inválidas.' });
    }
    console.log('[LOGIN] Admin encontrado:', { email, role: admin.role });

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('[LOGIN] Resultado da comparação de senha:', { isMatch });
    
    if (!isMatch) {
      console.log('[LOGIN] Senha incorreta para:', { email });
      return res.status(400).json({ success: false, message: 'Credenciais inválidas.' });
    }

    const payload = {
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('[LOGIN] Login bem-sucedido:', { email });
    return res.json({ success: true, token, admin });
  } catch (error) {
    console.error('Erro no login do admin:', error);
    return res.status(500).json({ success: false, message: 'Erro interno' });
  }
});

/**
 * Rota protegida de exemplo para administradores
 * GET /api/admin/secret
 */
router.get('/secret', authMiddleware, (req, res) => {
  return res.json({
    success: true,
    message: `Bem-vindo, ${req.admin.email}! Seu ID é ${req.admin.id} e seu papel é ${req.admin.role}.`
  });
});

/**
 * Verifica se o token é válido
 * GET /api/admin/verify-token
 */
router.get('/verify-token', async (req, res) => {
  try {
    // Obter o token do cabeçalho de autorização
    const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token não fornecido' 
      });
    }
    
    // Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificar se o admin existe no banco de dados
    const admin = await Admin.findById(decoded.admin.id).select('-password');
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Administrador não encontrado'
      });
    }
    
    // Retorna os dados do admin
    return res.json({
      success: true,
      message: 'Token válido',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
    
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    return res.status(401).json({
      success: false,
      message: 'Token inválido ou expirado'
    });
  }
});

/**
 * Busca todos os leads
 * GET /api/admin/leads
 */
router.get('/leads', authMiddleware, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    return res.json(leads); // Retorna o array diretamente
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar leads'
    });
  }
});

/**
 * Adiciona um novo lead
 * POST /api/admin/leads
 */
router.post('/leads', authMiddleware, async (req, res) => {
  try {
    const { nome, email, telefone, cnpj, mensagem, pedido } = req.body;
    
    const newLead = new Lead({
      nome,
      email,
      telefone,
      cnpj,
      mensagem,
      pedido
    });
    
    const savedLead = await newLead.save();
    
    return res.status(201).json({
      success: true,
      data: savedLead,
      message: 'Lead adicionado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao adicionar lead:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao adicionar lead'
    });
  }
});

/**
 * Busca um lead pelo ID
 * GET /api/admin/leads/:id
 */
router.get('/leads/:id', authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead não encontrado'
      });
    }
    
    return res.json(lead);
  } catch (error) {
    console.error('Erro ao buscar lead específico:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar lead'
    });
  }
});

/**
 * Atualiza o status de um lead
 * PUT /api/admin/leads/:id
 */
router.put('/leads/:id', authMiddleware, async (req, res) => {
  try {
    const { status, notes, ...updateData } = req.body;
    
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { 
        ...updateData,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead não encontrado'
      });
    }
    
    return res.json(lead);
  } catch (error) {
    console.error('Erro ao atualizar lead:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao atualizar lead'
    });
  }
});

/**
 * Deleta um lead
 * DELETE /api/admin/leads/:id
 */
router.delete('/leads/:id', authMiddleware, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead não encontrado'
      });
    }
    
    return res.json({
      success: true,
      message: 'Lead removido com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar lead:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao deletar lead'
    });
  }
});

module.exports = router;