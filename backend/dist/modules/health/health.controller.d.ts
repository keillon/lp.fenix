export declare class HealthController {
    private readonly logger;
    checkHealth(): {
        status: string;
        timestamp: string;
        database: boolean;
        services: {
            auth: boolean;
            quotations: boolean;
            representatives: boolean;
        };
        version: string;
        environment: string;
    };
}
