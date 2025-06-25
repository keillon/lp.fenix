import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { DepositsService } from '../services/deposits.service';
import { CreateDepositDto } from '../dto/create-deposit.dto';
import { UpdateDepositDto } from '../dto/update-deposit.dto';

@Controller('deposits')
export class DepositsController {
  constructor(private readonly depositsService: DepositsService) {}

  @Post()
  async create(@Body() createDepositDto: CreateDepositDto) {
    return this.depositsService.create(createDepositDto);
  }

  @Get()
  async findAll() {
    return this.depositsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.depositsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDepositDto: UpdateDepositDto) {
    return this.depositsService.update(id, updateDepositDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.depositsService.remove(id);
  }
} 