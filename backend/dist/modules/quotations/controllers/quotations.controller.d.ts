import { QuotationsService } from '../services/quotations.service';
import { CreateQuotationDto } from '../dto/create-quotation.dto';
import { UpdateQuotationDto } from '../dto/update-quotation.dto';
export declare class QuotationsController {
    private readonly quotationsService;
    constructor(quotationsService: QuotationsService);
    create(createQuotationDto: CreateQuotationDto): Promise<import("../entities/quotation.entity").Quotation>;
    findAll(email?: string): Promise<import("../entities/quotation.entity").Quotation[]>;
    getStats(): Promise<any>;
    findOne(id: string): Promise<import("../entities/quotation.entity").Quotation>;
    update(id: string, updateQuotationDto: UpdateQuotationDto): Promise<import("../entities/quotation.entity").Quotation>;
    updateStatus(id: string, status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled', value?: string, message?: string): Promise<import("../entities/quotation.entity").Quotation>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    removeAlternative(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    publicRemove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
