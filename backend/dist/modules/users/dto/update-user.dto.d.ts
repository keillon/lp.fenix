export declare class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'manager' | 'user';
    isActive?: boolean;
}
