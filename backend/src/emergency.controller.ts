import { Controller, Delete, Param, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quotation } from './modules/quotations/entities/quotation.entity';

@Controller('emergency')
export class EmergencyController {
  constructor(
    @InjectRepository(Quotation)
    private quotationsRepository: Repository<Quotation>,
  ) {}

  @Delete('delete-quotation/:id')
  @HttpCode(HttpStatus.OK)
  async deleteQuotation(@Param('id') id: string) {
    console.log(`
    ================================================
    EMERGÊNCIA: EXCLUINDO COTAÇÃO ${id} DIRETAMENTE!
    ================================================
    `);
    
    try {
      // Verificar se a cotação existe
      const quotation = await this.quotationsRepository.findOne({
        where: { id },
      });
      
      if (!quotation) {
        console.log(`[EMERGÊNCIA] Cotação ${id} não encontrada!`);
        return { success: false, message: 'Cotação não encontrada' };
      }
      
      // Executar delete com queryBuilder
      const result = await this.quotationsRepository
        .createQueryBuilder()
        .delete()
        .from(Quotation)
        .where("id = :id", { id })
        .execute();
      
      console.log(`[EMERGÊNCIA] Resultado da exclusão:`, result);
      
      if (result.affected === 0) {
        console.log(`[EMERGÊNCIA] Nenhum registro afetado!`);
        return { success: false, message: 'Nenhum registro foi afetado' };
      }
      
      console.log(`[EMERGÊNCIA] Cotação ${id} excluída com sucesso!`);
      return { success: true, message: `Cotação ${id} excluída com sucesso!` };
    } catch (error) {
      console.error(`[EMERGÊNCIA] Erro ao excluir cotação ${id}:`, error);
      return { success: false, message: `Erro: ${error.message}` };
    }
  }

  @Post('force-delete-quotation/:id')
  @HttpCode(HttpStatus.OK)
  async forceDeleteQuotation(@Param('id') id: string) {
    console.log(`
    ================================================
    EMERGÊNCIA: FORÇA BRUTA PARA EXCLUIR COTAÇÃO ${id}!
    ================================================
    `);
    
    try {
      // Verificação de existência
      console.log(`[EMERGÊNCIA] Buscando cotação ${id}`);
      const quotation = await this.quotationsRepository.findOne({
        where: { id },
      });
      
      console.log(`[EMERGÊNCIA] Resultado da busca:`, quotation ? 'Cotação encontrada' : 'Cotação não encontrada');
      
      // Mesmo que não encontre, tenta excluir de qualquer forma
      // Executa uma exclusão direta via SQL para garantir
      console.log(`[EMERGÊNCIA] Executando exclusão direta via queryBuilder`);
      
      const deleteResult = await this.quotationsRepository
        .createQueryBuilder()
        .delete()
        .from(Quotation)
        .where("id = :id", { id })
        .execute();
      
      console.log(`[EMERGÊNCIA] Resultado da exclusão:`, deleteResult);
      
      // Excluiu com sucesso se afetou registros ou cotação não existia
      const success = deleteResult.affected > 0 || !quotation;
      
      return { 
        success: success, 
        message: success ? 
          `Cotação ${id} removida com sucesso` : 
          `Falha na remoção da cotação ${id}`,
        details: deleteResult
      };
    } catch (error) {
      console.error(`[EMERGÊNCIA] Erro fatal ao excluir cotação ${id}:`, error);
      // Retorna detalhes do erro para facilitar debug
      return { 
        success: false, 
        message: `Erro ao excluir cotação: ${error.message}`,
        stack: error.stack,
        error: error.toString()
      };
    }
  }
} 