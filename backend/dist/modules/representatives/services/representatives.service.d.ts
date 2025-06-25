import { Repository } from 'typeorm';
import { Representative } from '../entities/representative.entity';
import { CreateRepresentativeDto } from '../dto/create-representative.dto';
import { UpdateRepresentativeDto } from '../dto/update-representative.dto';
export declare class RepresentativesService {
    private representativesRepository;
    constructor(representativesRepository: Repository<Representative>);
    create(createRepresentativeDto: CreateRepresentativeDto): Promise<Representative>;
    findAll(search?: string, status?: 'pending' | 'approved' | 'rejected', skip?: number, take?: number): Promise<Representative[]>;
    findOne(id: string): Promise<Representative>;
    update(id: string, updateRepresentativeDto: UpdateRepresentativeDto): Promise<Representative>;
    updateStatus(id: string, status: 'pending' | 'approved' | 'rejected', message?: string): Promise<Representative>;
    remove(id: string): Promise<void>;
    getStats(): Promise<any>;
}
