import { DepositsService } from '../services/deposits.service';
import { CreateDepositDto } from '../dto/create-deposit.dto';
import { UpdateDepositDto } from '../dto/update-deposit.dto';
export declare class DepositsController {
    private readonly depositsService;
    constructor(depositsService: DepositsService);
    create(createDepositDto: CreateDepositDto): Promise<import("../entities/deposit.entity").Deposit>;
    findAll(): Promise<import("../entities/deposit.entity").Deposit[]>;
    findOne(id: string): Promise<import("../entities/deposit.entity").Deposit>;
    update(id: string, updateDepositDto: UpdateDepositDto): Promise<import("../entities/deposit.entity").Deposit>;
    remove(id: string): Promise<void>;
}
