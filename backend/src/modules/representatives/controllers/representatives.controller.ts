import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Logger } from '@nestjs/common';
import { RepresentativesService } from '../services/representatives.service';
import { CreateRepresentativeDto } from '../dto/create-representative.dto';
import { UpdateRepresentativeDto } from '../dto/update-representative.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';

@ApiTags('representantes')
@Controller('representatives')
export class RepresentativesController {
  private readonly logger = new Logger(RepresentativesController.name);

  constructor(private readonly representativesService: RepresentativesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo representante' })
  @ApiResponse({ status: 201, description: 'Representante criado com sucesso' })
  create(@Body() createRepresentativeDto: CreateRepresentativeDto) {
    this.logger.log(`Criando novo representante: ${JSON.stringify(createRepresentativeDto)}`);
    return this.representativesService.create(createRepresentativeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os representantes' })
  @ApiResponse({ status: 200, description: 'Lista de representantes' })
  async findAll(
    @Query('search') search?: string,
    @Query('status') status?: 'pending' | 'approved' | 'rejected',
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    this.logger.log(`Listando representantes: search=${search}, status=${status}, skip=${skip}, take=${take}`);
    const reps = await this.representativesService.findAll(
      search,
      status,
      skip ? parseInt(skip) : 0,
      take ? parseInt(take) : 20
    );
    this.logger.log(`Encontrados ${reps.length} representantes`);
    return { success: true, data: reps };
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter estatísticas dos representantes' })
  @ApiResponse({ status: 200, description: 'Estatísticas obtidas com sucesso' })
  getStats() {
    this.logger.log('Obtendo estatísticas de representantes');
    return this.representativesService.getStats();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter um representante pelo ID' })
  @ApiResponse({ status: 200, description: 'Representante encontrado' })
  @ApiResponse({ status: 404, description: 'Representante não encontrado' })
  findOne(@Param('id') id: string) {
    this.logger.log(`Buscando representante com ID: ${id}`);
    return this.representativesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar um representante' })
  @ApiResponse({ status: 200, description: 'Representante atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Representante não encontrado' })
  update(@Param('id') id: string, @Body() updateRepresentativeDto: UpdateRepresentativeDto) {
    this.logger.log(`Atualizando representante ${id}: ${JSON.stringify(updateRepresentativeDto)}`);
    return this.representativesService.update(id, updateRepresentativeDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar o status de um representante' })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Representante não encontrado' })
  updateStatus(
    @Param('id') id: string, 
    @Body('status') status: 'pending' | 'approved' | 'rejected',
    @Body('message') message?: string,
  ) {
    this.logger.log(`Atualizando status do representante ${id} para ${status}${message ? ` com mensagem: ${message}` : ''}`);
    try {
      return this.representativesService.updateStatus(id, status, message);
    } catch (error) {
      this.logger.error(`Erro ao atualizar status do representante ${id}`, error.stack);
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover um representante' })
  @ApiResponse({ status: 200, description: 'Representante removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Representante não encontrado' })
  remove(@Param('id') id: string) {
    this.logger.log(`Removendo representante com ID: ${id}`);
    return this.representativesService.remove(id);
  }
} 