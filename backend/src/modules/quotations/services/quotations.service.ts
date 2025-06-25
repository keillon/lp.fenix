import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quotation } from '../entities/quotation.entity';
import { CreateQuotationDto } from '../dto/create-quotation.dto';
import { UpdateQuotationDto } from '../dto/update-quotation.dto';

@Injectable()
export class QuotationsService {
  constructor(
    @InjectRepository(Quotation)
    private quotationsRepository: Repository<Quotation>,
  ) {}

  /**
   * Cria uma nova cotação
   */
  async create(createQuotationDto: CreateQuotationDto): Promise<Quotation> {
    console.log('DEBUG - Salvando cotação:', createQuotationDto);
    const quotation = this.quotationsRepository.create(createQuotationDto);
    const saved = await this.quotationsRepository.save(quotation);
    console.log('DEBUG - Cotação salva:', saved);
    return saved;
  }

  /**
   * Retorna todas as cotações, com opção de filtrar por email
   */
  async findAll(email?: string): Promise<Quotation[]> {
    if (email) {
      return this.quotationsRepository.find({
        where: { email },
        order: { createdAt: 'DESC' },
      });
    }
    return this.quotationsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Encontra uma cotação pelo ID
   */
  async findOne(id: string): Promise<Quotation> {
    const quotation = await this.quotationsRepository.findOne({
      where: { id },
    });
    
    if (!quotation) {
      throw new NotFoundException(`Cotação com ID ${id} não encontrada`);
    }
    
    return quotation;
  }

  /**
   * Atualiza uma cotação existente
   */
  async update(id: string, updateQuotationDto: UpdateQuotationDto): Promise<Quotation> {
    const quotation = await this.findOne(id);
    
    // Atualiza apenas os campos fornecidos
    Object.assign(quotation, updateQuotationDto);
    
    return this.quotationsRepository.save(quotation);
  }

  /**
   * Atualiza o status de uma cotação
   */
  async updateStatus(
    id: string, 
    status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled',
    value?: string,
    message?: string,
  ): Promise<Quotation> {
    const quotation = await this.findOne(id);
    
    quotation.status = status;
    
    if (value !== undefined) {
      quotation.value = value;
    }
    
    if (message !== undefined) {
      quotation.message = message;
    }
    
    return this.quotationsRepository.save(quotation);
  }

  /**
   * Remove uma cotação
   */
  async remove(id: string): Promise<{ success: boolean; message: string }> {
    console.log(`[QuotationsService] Iniciando remoção de cotação ID: ${id}`);
    
    try {
      // Verificar se a cotação existe
      const quotation = await this.quotationsRepository.findOne({
        where: { id },
      });
      
      if (!quotation) {
        console.log(`[QuotationsService] Cotação não encontrada: ${id}`);
        throw new NotFoundException(`Cotação com ID ${id} não encontrada`);
      }
      
      console.log(`[QuotationsService] Cotação encontrada: ${id}, status: ${quotation.status}`);
      
      // Executar delete com queryBuilder para garantir que seja executado corretamente
      const deleteResult = await this.quotationsRepository
        .createQueryBuilder()
        .delete()
        .from(Quotation)
        .where("id = :id", { id })
        .execute();
      
      console.log(`[QuotationsService] Resultado da exclusão:`, deleteResult);
      
      if (deleteResult.affected === 0) {
        console.log(`[QuotationsService] Nenhum registro afetado ao excluir cotação: ${id}`);
        throw new Error(`Falha ao excluir cotação: nenhum registro foi afetado`);
      }
      
      console.log(`[QuotationsService] Cotação excluída com sucesso: ${id}`);
      return { 
        success: true, 
        message: `Cotação ${id} excluída com sucesso` 
      };
    } catch (error) {
      // Se for um erro conhecido (como NotFoundException), apenas propagar
      if (error instanceof NotFoundException) {
        throw error;
      }
      
      console.error(`[QuotationsService] Erro ao excluir cotação ${id}:`, error);
      throw new Error(`Erro ao excluir cotação: ${error.message}`);
    }
  }

  /**
   * Retorna estatísticas das cotações
   */
  async getStats(): Promise<any> {
    const total = await this.quotationsRepository.count();
    
    const pending = await this.quotationsRepository.count({
      where: { status: 'pending' },
    });
    
    const approved = await this.quotationsRepository.count({
      where: { status: 'approved' },
    });
    
    const rejected = await this.quotationsRepository.count({
      where: { status: 'rejected' },
    });
    
    const completed = await this.quotationsRepository.count({
      where: { status: 'completed' },
    });
    
    const cancelled = await this.quotationsRepository.count({
      where: { status: 'cancelled' },
    });
    
    return {
      total,
      pending,
      approved,
      rejected,
      completed,
      cancelled,
    };
  }
} 