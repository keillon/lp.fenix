import { Client } from '../../clients/entities/client.entity';
import { Deposit } from '../../deposits/entities/deposit.entity';
export declare class Order {
    id: string;
    clientId: string;
    client: Client;
    originId: string;
    origin: Deposit;
    destinationId: string;
    destination: Deposit;
    status: string;
    value: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
