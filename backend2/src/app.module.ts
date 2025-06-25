// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { QuotationsModule } from './modules/quotations/quotations.module';
import { RepresentativesModule } from './modules/representatives/representatives.module';
import { DepositsModule } from './modules/deposits/deposits.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ClientsModule } from './modules/clients/clients.module';
import { HealthModule } from './modules/health/health.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { EmergencyController } from './emergency.controller';

// Importar todas as entidades explicitamente
import { User } from './modules/users/entities/user.entity';
import { Quotation } from './modules/quotations/entities/quotation.entity';
import { Representative } from './modules/representatives/entities/representative.entity';
import { Deposit } from './modules/deposits/entities/deposit.entity';
import { Vehicle } from './modules/vehicles/entities/vehicle.entity';
import { Order } from './modules/orders/entities/order.entity';
import { Client } from './modules/clients/entities/client.entity';

@Module({
  imports: [
    // Configuração do módulo de ambiente
    ConfigModule.forRoot(),
    
    // Configuração do TypeORM para PostgreSQL usando forRootAsync
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', '195.35.40.86'),
        port: parseInt(configService.get('DB_PORT', '5432')),
        username: configService.get('DB_USERNAME', 'brprixxuser'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE', 'brprixxdb'),
        entities: [User, Quotation, Representative, Deposit, Vehicle, Order, Client],
        synchronize: configService.get('NODE_ENV', 'development') !== 'production',
        autoLoadEntities: true,
        // Adicionando mais opções para diagnóstico e debug
        logging: true,
        name: 'default',
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    
    // Registro direto da entidade Quotation para o EmergencyController
    TypeOrmModule.forFeature([Quotation]),
    
    // Módulos da aplicação
    AuthModule,
    UsersModule,
    QuotationsModule,
    RepresentativesModule,
    DepositsModule,
    DashboardModule,
    VehiclesModule,
    OrdersModule,
    ClientsModule,
    HealthModule,
    NotificationsModule,
  ],
  controllers: [EmergencyController],
  providers: [],
})
export class AppModule {}