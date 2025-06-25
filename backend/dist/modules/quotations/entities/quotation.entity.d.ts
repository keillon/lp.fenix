export declare class Quotation {
    id: string;
    originCity: string;
    originState: string;
    destinationCity: string;
    destinationState: string;
    cargoWeight: string;
    palletized: string;
    palletQuantity?: string;
    volumes: {
        qtde: string;
        altura: string;
        largura: string;
        comprimento: string;
    }[];
    totalVolume: number;
    fullName: string;
    email: string;
    phone: string;
    cnpj: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
    value?: string;
    message?: string;
    createdAt: Date;
    updatedAt: Date;
}
