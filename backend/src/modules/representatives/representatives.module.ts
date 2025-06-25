import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Representative } from './entities/representative.entity';
import { RepresentativesService } from './services/representatives.service';
import { RepresentativesController } from './controllers/representatives.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Representative]),
  ],
  controllers: [RepresentativesController],
  providers: [RepresentativesService],
  exports: [RepresentativesService],
})
export class RepresentativesModule {} 