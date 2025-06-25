import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { QuotationsService } from '../services/quotations.service';
import { CreateQuotationDto } from '../dto/create-quotation.dto';
import { UpdateQuotationDto } from '../dto/update-quotation.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';

@ApiTags('cotações')
@Controller('quotations')
export class QuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova cotação' })
  @ApiResponse({ status: 201, description: 'Cotação criada com sucesso' })
  create(@Body() createQuotationDto: CreateQuotationDto) {
    return this.quotationsService.create(createQuotationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as cotações' })
  @ApiQuery({ name: 'email', required: false })
  @ApiResponse({ status: 200, description: 'Lista de cotações' })
  findAll(@Query('email') email?: string) {
    return this.quotationsService.findAll(email);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter estatísticas das cotações' })
  @ApiResponse({ status: 200, description: 'Estatísticas obtidas com sucesso' })
  getStats() {
    return this.quotationsService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma cotação pelo ID' })
  @ApiResponse({ status: 200, description: 'Cotação encontrada' })
  @ApiResponse({ status: 404, description: 'Cotação não encontrada' })
  findOne(@Param('id') id: string) {
    return this.quotationsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar uma cotação' })
  @ApiResponse({ status: 200, description: 'Cotação atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Cotação não encontrada' })
  update(@Param('id') id: string, @Body() updateQuotationDto: UpdateQuotationDto) {
    return this.quotationsService.update(id, updateQuotationDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar o status de uma cotação' })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cotação não encontrada' })
  updateStatus(
    @Param('id') id: string, 
    @Body('status') status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled',
    @Body('value') value?: string,
    @Body('message') message?: string,
  ) {
    return this.quotationsService.updateStatus(id, status, value, message);
  }

  @Delete(':id')
  // Remover a proteção JWT para resolver problemas temporários
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover uma cotação' })
  @ApiResponse({ status: 200, description: 'Cotação removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Cotação não encontrada' })
  remove(@Param('id') id: string) {
    console.log(`Solicitação de exclusão para cotação ID: ${id}`);
    return this.quotationsService.remove(id);
  }

  // Rota alternativa para exclusão que usa POST em vez de DELETE
  @Post('delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover uma cotação (método alternativo)' })
  @ApiResponse({ status: 200, description: 'Cotação removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Cotação não encontrada' })
  removeAlternative(@Param('id') id: string) {
    console.log(`Solicitação de exclusão alternativa para cotação ID: ${id}`);
    return this.quotationsService.remove(id);
  }

  // Rota PÚBLICA para exclusão de emergência (remover após resolução do problema)
  @Delete('public-delete/:id')
  @ApiOperation({ summary: 'EMERGÊNCIA: Remover uma cotação sem autenticação' })
  @ApiResponse({ status: 200, description: 'Cotação removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Cotação não encontrada' })
  publicRemove(@Param('id') id: string) {
    console.log(`============================================`);
    console.log(`[EMERGÊNCIA] EXCLUINDO COTAÇÃO SEM AUTENTICAÇÃO: ${id}`);
    console.log(`============================================`);
    
    try {
      const result = this.quotationsService.remove(id);
      console.log(`[EMERGÊNCIA] Cotação ${id} excluída com sucesso!`);
      return result;
    } catch (error) {
      console.error(`[EMERGÊNCIA] Erro ao excluir cotação ${id}:`, error.message);
      throw error;
    }
  }
} 