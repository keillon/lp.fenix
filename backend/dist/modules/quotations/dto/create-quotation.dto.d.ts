export declare class VolumeDto {
    qtde: string;
    altura: string;
    largura: string;
    comprimento: string;
}
export declare class CreateQuotationDto {
    originCity: string;
    originState: string;
    destinationCity: string;
    destinationState: string;
    cargoWeight: string;
    palletized: string;
    palletQuantity?: string;
    volumes?: VolumeDto[];
    totalVolume?: number;
    fullName: string;
    email: string;
    phone: string;
    cnpj: string;
    status?: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
    value?: string;
    message?: string;
}
