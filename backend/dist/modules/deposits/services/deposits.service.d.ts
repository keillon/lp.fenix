import { Repository } from 'typeorm';
import { Deposit } from '../entities/deposit.entity';
import { CreateDepositDto } from '../dto/create-deposit.dto';
import { UpdateDepositDto } from '../dto/update-deposit.dto';
export declare class DepositsService {
    private readonly depositRepository;
    constructor(depositRepository: Repository<Deposit>);
    create(createDepositDto: CreateDepositDto): Promise<Deposit>;
    findAll(): Promise<Deposit[]>;
    findOne(id: string): Promise<Deposit>;
    update(id: string, updateDepositDto: UpdateDepositDto): Promise<Deposit>;
    remove(id: string): Promise<void>;
}
