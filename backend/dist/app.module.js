"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const quotations_module_1 = require("./modules/quotations/quotations.module");
const representatives_module_1 = require("./modules/representatives/representatives.module");
const deposits_module_1 = require("./modules/deposits/deposits.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const vehicles_module_1 = require("./modules/vehicles/vehicles.module");
const orders_module_1 = require("./modules/orders/orders.module");
const clients_module_1 = require("./modules/clients/clients.module");
const health_module_1 = require("./modules/health/health.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const emergency_controller_1 = require("./emergency.controller");
const user_entity_1 = require("./modules/users/entities/user.entity");
const quotation_entity_1 = require("./modules/quotations/entities/quotation.entity");
const representative_entity_1 = require("./modules/representatives/entities/representative.entity");
const deposit_entity_1 = require("./modules/deposits/entities/deposit.entity");
const vehicle_entity_1 = require("./modules/vehicles/entities/vehicle.entity");
const order_entity_1 = require("./modules/orders/entities/order.entity");
const client_entity_1 = require("./modules/clients/entities/client.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', '195.35.40.86'),
                    port: parseInt(configService.get('DB_PORT', '5432')),
                    username: configService.get('DB_USERNAME', 'brprixxuser'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_DATABASE', 'brprixxdb'),
                    entities: [user_entity_1.User, quotation_entity_1.Quotation, representative_entity_1.Representative, deposit_entity_1.Deposit, vehicle_entity_1.Vehicle, order_entity_1.Order, client_entity_1.Client],
                    synchronize: configService.get('NODE_ENV', 'development') !== 'production',
                    autoLoadEntities: true,
                    logging: true,
                    name: 'default',
                }),
                dataSourceFactory: async (options) => {
                    const dataSource = await new typeorm_2.DataSource(options).initialize();
                    return dataSource;
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([quotation_entity_1.Quotation]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            quotations_module_1.QuotationsModule,
            representatives_module_1.RepresentativesModule,
            deposits_module_1.DepositsModule,
            dashboard_module_1.DashboardModule,
            vehicles_module_1.VehiclesModule,
            orders_module_1.OrdersModule,
            clients_module_1.ClientsModule,
            health_module_1.HealthModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [emergency_controller_1.EmergencyController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map