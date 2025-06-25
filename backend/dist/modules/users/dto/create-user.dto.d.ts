export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: 'admin' | 'manager' | 'user';
    isActive?: boolean;
}
