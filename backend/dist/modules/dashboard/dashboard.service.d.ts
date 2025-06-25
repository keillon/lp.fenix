import { Repository } from 'typeorm';
import { Quotation } from '../quotations/entities/quotation.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Representative } from '../representatives/entities/representative.entity';
import { Deposit } from '../deposits/entities/deposit.entity';
import { Order } from '../orders/entities/order.entity';
export declare class DashboardService {
    private quotationRepository;
    private vehicleRepository;
    private representativeRepository;
    private depositRepository;
    private orderRepository;
    constructor(quotationRepository: Repository<Quotation>, vehicleRepository: Repository<Vehicle>, representativeRepository: Repository<Representative>, depositRepository: Repository<Deposit>, orderRepository: Repository<Order>);
    getStats(): Promise<{
        cotacoes: number;
        veiculos: number;
        representantes: number;
        depositos: number;
    }>;
    getEncomendasRecentes(): Promise<Order[]>;
    getVeiculosRecentes(): Promise<Vehicle[]>;
    getRepresentantesRecentes(): Promise<Representative[]>;
    getCotacoesRecentes(): Promise<Quotation[]>;
    getNotifications(): Promise<any[]>;
}
