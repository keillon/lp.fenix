import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('admin/dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Obter estatísticas gerais do dashboard' })
  @ApiResponse({ status: 200, description: 'Estatísticas retornadas com sucesso' })
  async getStats() {
    return this.dashboardService.getStats();
  }

  @Get('representantes')
  @ApiOperation({ summary: 'Obter representantes recentes' })
  @ApiResponse({ status: 200, description: 'Representantes retornados com sucesso' })
  async getRepresentantesRecentes() {
    return this.dashboardService.getRepresentantesRecentes();
  }

  @Get('representantes-recentes')
  @ApiOperation({ summary: 'Obter representantes recentes (alias)' })
  @ApiResponse({ status: 200, description: 'Representantes retornados com sucesso' })
  async getRepresentantesRecentesAlias() {
    return this.dashboardService.getRepresentantesRecentes();
  }

  @Get('cotacoes')
  @ApiOperation({ summary: 'Obter cotações recentes' })
  @ApiResponse({ status: 200, description: 'Cotações retornadas com sucesso' })
  async getCotacoesRecentes() {
    return this.dashboardService.getCotacoesRecentes();
  }

  @Get('notifications')
  @ApiOperation({ summary: 'Obter notificações do admin' })
  @ApiResponse({ status: 200, description: 'Notificações retornadas com sucesso' })
  async getNotifications() {
    return this.dashboardService.getNotifications?.() ?? [];
  }
}
