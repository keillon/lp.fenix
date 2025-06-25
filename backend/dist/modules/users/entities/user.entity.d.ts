export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'manager' | 'user';
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
