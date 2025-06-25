import { QuotationsService } from '../services/quotations.service';
export declare class AdminQuotationsController {
    private readonly quotationsService;
    constructor(quotationsService: QuotationsService);
    findAll(): Promise<import("../entities/quotation.entity").Quotation[]>;
}
