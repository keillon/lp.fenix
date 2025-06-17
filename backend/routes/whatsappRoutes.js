/**
 * Rotas para integração com WhatsApp via CallMeBot
 * 
 * Este arquivo contém as rotas para envio de mensagens via WhatsApp
 * para leads existentes no sistema.
 */
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Lead = require('../models/Lead');

/**
 * @route   POST /api/whatsapp/send/:id
 * @desc    Envia mensagem via WhatsApp para um lead específico
 * @access  Autenticado (definido na montagem da rota)
 */
router.post('/send/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    
    // Valida se o ID foi fornecido
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID do lead é obrigatório'
      });
    }
    
    // Valida se a mensagem foi fornecida
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Mensagem é obrigatória'
      });
    }
    
    console.log(`[INFO] Tentando enviar WhatsApp para lead ID: ${id}`);
    
    // Busca o lead no banco de dados
    const lead = await Lead.findById(id);
    
    // Verifica se o lead existe
    if (!lead) {
      console.warn(`[WARN] Lead ID ${id} não encontrado`);
      return res.status(404).json({
        success: false,
        message: 'Lead não encontrado'
      });
    }
    
    // Verifica se o lead tem telefone
    if (!lead.telefone) {
      console.warn(`[WARN] Lead ID ${id} não possui telefone`);
      return res.status(400).json({
        success: false,
        message: 'Este lead não possui telefone cadastrado'
      });
    }
    
    // Formata o telefone para garantir que esteja no formato correto
    let telefone = lead.telefone.replace(/\D/g, '');
    if (!telefone.startsWith('55')) {
      telefone = '55' + telefone;
    }
    
    // Obtém as variáveis de ambiente necessárias para o envio via CallMeBot
    const apiPhone = process.env.WHATSAPP_NUMBER;
    const apiKey = process.env.CALLMEBOT_API_KEY;
    
    // Verifica se as variáveis de ambiente estão configuradas
    if (!apiPhone || !apiKey) {
      console.error('[ERROR] Configuração de WhatsApp não encontrada no servidor');
      return res.status(500).json({
        success: false,
        message: 'Configuração de WhatsApp não encontrada no servidor'
      });
    }
    
    // Formata a mensagem a ser enviada
    const formattedMessage = `Olá ${lead.nome}, ${message}`;
    
    // Constrói a URL do WhatsApp usando a API do CallMeBot
    const whatsappUrl = `https://api.callmebot.com/whatsapp.php?phone=${apiPhone}&text=${encodeURIComponent(formattedMessage)}&apikey=${apiKey}`;
    
    console.log(`[INFO] Enviando mensagem para ${lead.nome} via CallMeBot`);
    
    // Envia a requisição para o CallMeBot
    const response = await fetch(whatsappUrl);
    
    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[ERROR] Erro na API CallMeBot:', errorText);
      return res.status(response.status).json({
        success: false,
        message: `Falha ao enviar mensagem: ${response.statusText}`
      });
    }
    
    // Obtém o resultado da API
    const responseText = await response.text();
    console.log('[SUCCESS] Mensagem enviada com sucesso');
    
    // Atualiza o lead para marcar como atendido
    lead.atendido = true;
    await lead.save();
    
    // Retorna sucesso
    return res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso',
      responseFromApi: responseText
    });
    
  } catch (error) {
    console.error('[ERROR] Erro ao enviar mensagem:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Erro interno ao enviar mensagem'
    });
  }
});

/**
 * @route   POST /api/whatsapp/send-direct
 * @desc    Envia mensagem direta para um número sem salvar como lead
 * @access  Autenticado (definido na montagem da rota)
 */
router.post('/send-direct', async (req, res) => {
  try {
    const { phone, message } = req.body;
    
    // Validação básica
    if (!phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Telefone e mensagem são obrigatórios'
      });
    }
    
    // Formata o telefone
    let telefone = phone.replace(/\D/g, '');
    if (!telefone.startsWith('55')) {
      telefone = '55' + telefone;
    }
    
    // Obtém as variáveis de ambiente
    const apiPhone = process.env.WHATSAPP_NUMBER;
    const apiKey = process.env.CALLMEBOT_API_KEY;
    
    if (!apiPhone || !apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Configuração de WhatsApp não encontrada'
      });
    }
    
    // Cria a URL para o WhatsApp
    const whatsappUrl = `https://wa.me/${telefone}?text=${encodeURIComponent(message)}`;
    
    return res.status(200).json({
      success: true,
      whatsappUrl
    });
    
  } catch (error) {
    console.error('[ERROR] Erro ao gerar link WhatsApp:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao gerar link para WhatsApp'
    });
  }
});

module.exports = router;