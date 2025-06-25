import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<{
        cotacoes: number;
        veiculos: number;
        representantes: number;
        depositos: number;
    }>;
    getRepresentantesRecentes(): Promise<import("../representatives/entities/representative.entity").Representative[]>;
    getRepresentantesRecentesAlias(): Promise<import("../representatives/entities/representative.entity").Representative[]>;
    getCotacoesRecentes(): Promise<import("../quotations/entities/quotation.entity").Quotation[]>;
    getNotifications(): Promise<any[]>;
}
