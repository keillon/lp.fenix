import { Repository } from 'typeorm';
import { Quotation } from '../entities/quotation.entity';
import { CreateQuotationDto } from '../dto/create-quotation.dto';
import { UpdateQuotationDto } from '../dto/update-quotation.dto';
export declare class QuotationsService {
    private quotationsRepository;
    constructor(quotationsRepository: Repository<Quotation>);
    create(createQuotationDto: CreateQuotationDto): Promise<Quotation>;
    findAll(email?: string): Promise<Quotation[]>;
    findOne(id: string): Promise<Quotation>;
    update(id: string, updateQuotationDto: UpdateQuotationDto): Promise<Quotation>;
    updateStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled', value?: string, message?: string): Promise<Quotation>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getStats(): Promise<any>;
}
