import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
export declare class VehiclesService {
    private vehiclesRepository;
    constructor(vehiclesRepository: Repository<Vehicle>);
    findAll(): Promise<Vehicle[]>;
}
