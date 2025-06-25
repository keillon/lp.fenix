import { RepresentativesService } from '../services/representatives.service';
import { CreateRepresentativeDto } from '../dto/create-representative.dto';
import { UpdateRepresentativeDto } from '../dto/update-representative.dto';
export declare class RepresentativesController {
    private readonly representativesService;
    private readonly logger;
    constructor(representativesService: RepresentativesService);
    create(createRepresentativeDto: CreateRepresentativeDto): Promise<import("../entities/representative.entity").Representative>;
    findAll(search?: string, status?: 'pending' | 'approved' | 'rejected', skip?: string, take?: string): Promise<{
        success: boolean;
        data: import("../entities/representative.entity").Representative[];
    }>;
    getStats(): Promise<any>;
    findOne(id: string): Promise<import("../entities/representative.entity").Representative>;
    update(id: string, updateRepresentativeDto: UpdateRepresentativeDto): Promise<import("../entities/representative.entity").Representative>;
    updateStatus(id: string, status: 'pending' | 'approved' | 'rejected', message?: string): Promise<import("../entities/representative.entity").Representative>;
    remove(id: string): Promise<void>;
}
