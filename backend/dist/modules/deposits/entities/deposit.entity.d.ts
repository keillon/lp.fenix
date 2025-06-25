export declare class Deposit {
    id: string;
    code: string;
    name: string;
    type: 'PRINCIPAL' | 'SECUNDARIO' | 'TEMPORARIO';
    status: 'ATIVO' | 'INATIVO' | 'MANUTENCAO';
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    latitude?: number;
    longitude?: number;
    phone: string;
    email: string;
    responsible: string;
    capacityTotal: number;
    capacityUsed: number;
    capacityUnit: 'M3' | 'TON' | 'PALLETS';
    hasDock: boolean;
    hasSecurity: boolean;
    hasClimateControl: boolean;
    hasForklift: boolean;
    hasLoadingArea: boolean;
    hasUnloadingArea: boolean;
    hasParking: boolean;
    hasOffice: boolean;
    operatingHours?: Record<string, {
        open: string;
        close: string;
    }>;
    documents?: Array<{
        name: string;
        type: string;
        url: string;
        expiryDate?: Date;
    }>;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}
