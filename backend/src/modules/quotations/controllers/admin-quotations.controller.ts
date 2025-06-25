import { Controller, Get, UseGuards } from '@nestjs/common';
import { QuotationsService } from '../services/quotations.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Admin Quotations')
@Controller('admin/quotations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminQuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as cotações (admin)' })
  @ApiResponse({ status: 200, description: 'Cotações listadas com sucesso' })
  findAll() {
    return this.quotationsService.findAll();
  }
}
