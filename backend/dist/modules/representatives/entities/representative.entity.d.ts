export declare class Representative {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    cpfCnpj: string;
    city: string;
    state: string;
    experience?: string;
    coverageArea?: string;
    message?: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}
