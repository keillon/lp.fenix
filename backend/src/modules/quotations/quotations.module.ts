import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quotation } from './entities/quotation.entity';
import { QuotationsService } from './services/quotations.service';
import { QuotationsController } from './controllers/quotations.controller';
import { AdminQuotationsController } from './controllers/admin-quotations.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quotation]),
  ],
  controllers: [QuotationsController, AdminQuotationsController],
  providers: [QuotationsService],
  exports: [QuotationsService],
})
export class QuotationsModule {}
