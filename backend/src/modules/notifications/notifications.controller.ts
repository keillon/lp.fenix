import { Controller, Get, Post, Body, Param, UseGuards, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

interface Notification {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  read: boolean;
}

@ApiTags('notifications')
@Controller('admin/notifications')
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);
  private notifications: Notification[] = [];

  constructor() {
    // Inicializar com algumas notificações fake para teste
    this.notifications = [
      {
        id: 'notif-1',
        type: 'representante',
        message: 'Novos representantes aguardando aprovação',
        createdAt: new Date().toISOString(),
        read: false
      },
      {
        id: 'notif-2',
        type: 'cotacao',
        message: 'Novas cotações recebidas',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true
      }
    ];
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter todas as notificações administrativas' })
  @ApiResponse({ status: 200, description: 'Lista de notificações' })
  getAllNotifications() {
    this.logger.log('Obtendo todas as notificações administrativas');
    return this.notifications;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter uma notificação específica pelo ID' })
  @ApiResponse({ status: 200, description: 'Notificação encontrada' })
  @ApiResponse({ status: 404, description: 'Notificação não encontrada' })
  getNotificationById(@Param('id') id: string) {
    this.logger.log(`Obtendo notificação com ID: ${id}`);
    const notification = this.notifications.find(n => n.id === id);
    if (!notification) {
      return { success: false, message: 'Notificação não encontrada' };
    }
    return { success: true, data: notification };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar uma nova notificação' })
  @ApiResponse({ status: 201, description: 'Notificação criada com sucesso' })
  createNotification(@Body() data: any) {
    this.logger.log('Criando nova notificação');
    
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      type: data.type || 'general',
      message: data.message,
      createdAt: new Date().toISOString(),
      read: false
    };
    
    this.notifications.push(newNotification);
    return { success: true, data: newNotification };
  }

  @Post(':id/read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marcar uma notificação como lida' })
  @ApiResponse({ status: 200, description: 'Notificação marcada como lida' })
  @ApiResponse({ status: 404, description: 'Notificação não encontrada' })
  markAsRead(@Param('id') id: string) {
    this.logger.log(`Marcando notificação como lida: ${id}`);
    
    const index = this.notifications.findIndex(n => n.id === id);
    if (index === -1) {
      return { success: false, message: 'Notificação não encontrada' };
    }
    
    this.notifications[index].read = true;
    return { success: true, data: this.notifications[index] };
  }
} 