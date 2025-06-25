import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from './entities/deposit.entity';
import { DepositsService } from './services/deposits.service';
import { DepositsController } from './controllers/deposits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deposit])],
  controllers: [DepositsController],
  providers: [DepositsService],
  exports: [DepositsService],
})
export class DepositsModule {} 