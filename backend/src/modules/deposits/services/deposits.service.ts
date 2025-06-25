import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deposit } from '../entities/deposit.entity';
import { CreateDepositDto } from '../dto/create-deposit.dto';
import { UpdateDepositDto } from '../dto/update-deposit.dto';

@Injectable()
export class DepositsService {
  constructor(
    @InjectRepository(Deposit)
    private readonly depositRepository: Repository<Deposit>,
  ) {}

  async create(createDepositDto: CreateDepositDto): Promise<Deposit> {
    const deposit = this.depositRepository.create(createDepositDto);
    return this.depositRepository.save(deposit);
  }

  async findAll(): Promise<Deposit[]> {
    return this.depositRepository.find();
  }

  async findOne(id: string): Promise<Deposit> {
    const deposit = await this.depositRepository.findOne({ where: { id } });
    if (!deposit) throw new NotFoundException('Depósito não encontrado');
    return deposit;
  }

  async update(id: string, updateDepositDto: UpdateDepositDto): Promise<Deposit> {
    const deposit = await this.findOne(id);
    Object.assign(deposit, updateDepositDto);
    return this.depositRepository.save(deposit);
  }

  async remove(id: string): Promise<void> {
    const result = await this.depositRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Depósito não encontrado');
  }
} 