import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Quotation } from '../quotations/entities/quotation.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Representative } from '../representatives/entities/representative.entity';
import { Deposit } from '../deposits/entities/deposit.entity';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quotation,
      Vehicle,
      Representative,
      Deposit,
      Order,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {} 