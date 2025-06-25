import { Controller, Get } from '@nestjs/common';
import { VehiclesService } from '../services/vehicles.service';
import { Vehicle } from '../entities/vehicle.entity';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  findAll(): Promise<Vehicle[]> {
    return this.vehiclesService.findAll();
  }
} 