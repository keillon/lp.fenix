import { VehiclesService } from '../services/vehicles.service';
import { Vehicle } from '../entities/vehicle.entity';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    findAll(): Promise<Vehicle[]>;
}
