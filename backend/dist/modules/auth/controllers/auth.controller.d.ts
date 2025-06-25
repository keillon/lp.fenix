import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyToken(authorization: string, cookie: string): Promise<{
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
    }> | {
        valid: boolean;
    };
    getProfile(user: any): any;
    logout(authorization: string): {
        success: boolean;
        message: string;
    };
    health(): {
        status: string;
        timestamp: string;
    };
}
