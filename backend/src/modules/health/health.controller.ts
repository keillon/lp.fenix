import { Controller, Get, Logger } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  @Get()
  @Public()
  @ApiOperation({ summary: 'Verificar a saúde do sistema' })
  @ApiResponse({ status: 200, description: 'Sistema saudável' })
  checkHealth() {
    this.logger.log('Verificação de saúde do sistema');
    return {
      status: 'online',
      timestamp: new Date().toISOString(),
      database: true,
      services: {
        auth: true,
        quotations: true, 
        representatives: true
      },
      version: process.env.API_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };
  }
} 