import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quotation } from '../quotations/entities/quotation.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Representative } from '../representatives/entities/representative.entity';
import { Deposit } from '../deposits/entities/deposit.entity';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Quotation)
    private quotationRepository: Repository<Quotation>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Representative)
    private representativeRepository: Repository<Representative>,
    @InjectRepository(Deposit)
    private depositRepository: Repository<Deposit>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getStats() {
    const [cotacoes, veiculos, representantes, depositos] = await Promise.all([
      this.quotationRepository.count(),
      this.vehicleRepository.count(),
      this.representativeRepository.count(),
      this.depositRepository.count(),
    ]);

    return {
      cotacoes,
      veiculos,
      representantes,
      depositos,
    };
  }

  async getEncomendasRecentes() {
    return this.orderRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
      relations: ['client', 'origin', 'destination'],
    });
  }

  async getVeiculosRecentes() {
    return this.vehicleRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
      relations: ['driver'],
    });
  }

  async getRepresentantesRecentes() {
    return this.representativeRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
    });
  }

  async getCotacoesRecentes() {
    return this.quotationRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
      relations: ['client', 'origin', 'destination'],
    });
  }

  async getNotifications() {
    // Exemplo: notificações baseadas em dados reais
    const [novasCotacoes, novosRepresentantes] = await Promise.all([
      this.quotationRepository.count({ where: { status: 'pending' } }),
      this.representativeRepository.count({ where: { status: 'pending' } }),
    ]);
    const notifications = [];
    if (novasCotacoes > 0) {
      notifications.push({
        type: 'cotacao',
        message: `Você tem ${novasCotacoes} cotações pendentes para aprovar.`
      });
    }
    if (novosRepresentantes > 0) {
      notifications.push({
        type: 'representante',
        message: `Você tem ${novosRepresentantes} representantes aguardando aprovação.`
      });
    }
    return notifications;
  }
} 