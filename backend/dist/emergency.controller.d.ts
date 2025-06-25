import { Repository } from 'typeorm';
import { Quotation } from './modules/quotations/entities/quotation.entity';
export declare class EmergencyController {
    private quotationsRepository;
    constructor(quotationsRepository: Repository<Quotation>);
    deleteQuotation(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    forceDeleteQuotation(id: string): Promise<{
        success: boolean;
        message: string;
        details: import("typeorm").DeleteResult;
        stack?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        stack: any;
        error: any;
        details?: undefined;
    }>;
}
