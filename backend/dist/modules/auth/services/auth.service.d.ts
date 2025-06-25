import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login({ email, password }: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "manager" | "user";
            isActive: boolean;
            lastLogin?: Date;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    verifyToken(token: string): Promise<{
        success: boolean;
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "manager" | "user";
        };
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        user?: undefined;
    }>;
    private comparePasswords;
}
