import { User } from '../../../modules/users/entities/user.entity';
export declare class Vehicle {
    id: string;
    plate: string;
    model: string;
    brand: string;
    year: number;
    capacity: number;
    status: string;
    driverId: string;
    driver: User;
    createdAt: Date;
    updatedAt: Date;
}
