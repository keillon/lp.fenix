/**
 * Rotas para gerenciamento de leads
 * 
 * Este arquivo contém as rotas da API para criar, listar e excluir leads,
 * com tratamento adequado de erros e formatação de dados.
 */
const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

/**
 * @route   POST /api/admin/leads
 * @desc    Cria um novo lead
 * @access  Público ou autenticado (definido na montagem da rota)
 */
router.post('/', async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    let { nome, email, telefone, cnpj, mensagem, pedido } = req.body;
    
    // Log para depuração
    console.log('[POST] Recebendo novo lead:', { nome, email, telefone, cnpj, mensagem, pedido });

    // Validação básica dos campos obrigatórios
    if (!nome || !email || !telefone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nome, email e telefone são campos obrigatórios' 
      });
    }

    // Padroniza o telefone
    telefone = telefone.replace(/\D/g, '');
    if (!telefone.startsWith('55')) {
      telefone = '55' + telefone;
    }

    // Garante que campos opcionais sejam sempre definidos, mesmo que vazios
    cnpj = cnpj || '';
    mensagem = mensagem || '';
    pedido = pedido || '';
    
    // MODIFICAÇÃO: Formata o CNPJ para garantir que seja salvo corretamente
    // Remove todos os caracteres não numéricos do CNPJ
    cnpj = cnpj.replace(/[^\d]/g, '');

    // MODIFICAÇÃO: Sempre cria um novo lead, sem verificar duplicatas
    // Cria um novo lead com os dados recebidos
    const newLead = new Lead({ nome, email, telefone, cnpj, mensagem, pedido });
    await newLead.save();

    // Monta uma URL de WhatsApp para contato
    const whatsappURL = `https://wa.me/${telefone}?text=Olá,%20${encodeURIComponent(nome)}!%20Recebemos%20seu%20cadastro.`;

    // Retorna o sucesso com a URL montada
    return res.status(201).json({ 
      success: true, 
      message: 'Lead criado com sucesso',
      whatsappURL 
    });
  } catch (error) {
    console.error('Erro ao criar lead:', error);
    
    // Em caso de erro, retorna uma mensagem genérica
    return res.status(500).json({ 
      success: false, 
      message: 'Erro interno ao processar lead.' 
    });
  }
});

/**
 * @route   GET /api/admin/leads
 * @desc    Lista todos os leads cadastrados
 * @access  Autenticado (definido na montagem da rota)
 */
router.get('/', async (req, res) => {
  try {
    console.log('[GET] Listando todos os leads...');
    
    // Busca todos os leads ordenados pela data de criação (mais recentes primeiro)
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    
    // Garante que todos os leads tenham os campos CNPJ e mensagem antes de retornar
    const processedLeads = leads.map(lead => {
      const leadObj = lead.toObject();
      
      // Garante que todos os campos opcionais existam e não sejam null
      const processed = {
        ...leadObj,
        cnpj: leadObj.cnpj || '',          // Garante que o CNPJ exista
        mensagem: leadObj.mensagem || '',  // Garante que mensagem exista
        pedido: leadObj.pedido || ''       // Garante que pedido exista
      };
      
      // MODIFICAÇÃO: Formata o CNPJ para exibição no frontend, se tiver 14 dígitos
      if (processed.cnpj && processed.cnpj.length === 14) {
        processed.cnpj = processed.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
      }
      
      // Log para depuração
      console.log(`Lead processado: ${processed._id}, CNPJ: "${processed.cnpj}"`);
      
      return processed;
    });
    
    // Retorna a lista de leads processados
    return res.status(200).json(processedLeads);
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro interno ao buscar leads.' 
    });
  }
});

/**
 * @route   DELETE /api/admin/leads/:id
 * @desc    Exclui um lead específico
 * @access  Autenticado (definido na montagem da rota)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[DELETE] Tentando excluir lead ID: ${id}`);

    // Validação do ID
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID inválido' 
      });
    }

    // Procura e exclui o lead pelo ID
    const lead = await Lead.findByIdAndDelete(id);

    // Caso o lead não seja encontrado, retorna erro 404
    if (!lead) {
      console.warn(`[DELETE] Lead ID: ${id} não encontrado.`);
      return res.status(404).json({ 
        success: false, 
        message: 'Lead não encontrado' 
      });
    }

    console.log(`[DELETE] Lead ID: ${id} excluído com sucesso.`);
    return res.status(200).json({ 
      success: true, 
      message: 'Lead excluído com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao excluir lead:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro interno ao excluir lead.' 
    });
  }
});

/**
 * @route   PUT /api/admin/leads/:id
 * @desc    Atualiza um lead específico
 * @access  Autenticado (definido na montagem da rota)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, cnpj, mensagem, pedido, atendido } = req.body;
    
    console.log(`[PUT] Atualizando lead ID: ${id}`);

    // Validação do ID
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID inválido' 
      });
    }

    // Busca o lead para atualização
    const lead = await Lead.findById(id);
    
    // Verifica se o lead existe
    if (!lead) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lead não encontrado' 
      });
    }

    // Atualiza os campos se fornecidos
    if (nome) lead.nome = nome;
    if (email) lead.email = email;
    if (telefone) lead.telefone = telefone;
    if (cnpj !== undefined) {
      // MODIFICAÇÃO: Formata o CNPJ antes de salvar (remove caracteres não numéricos)
      lead.cnpj = cnpj ? cnpj.replace(/[^\d]/g, '') : '';
    }
    if (mensagem !== undefined) lead.mensagem = mensagem || '';
    if (pedido !== undefined) lead.pedido = pedido || '';
    if (atendido !== undefined) lead.atendido = atendido;

    // Salva as alterações
    await lead.save();

    console.log(`[PUT] Lead ID: ${id} atualizado com sucesso.`);
    return res.status(200).json({ 
      success: true, 
      message: 'Lead atualizado com sucesso',
      lead: lead.toObject()
    });
  } catch (error) {
    console.error('Erro ao atualizar lead:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro interno ao atualizar lead.' 
    });
  }
});

module.exports = router;