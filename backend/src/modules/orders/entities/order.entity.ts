import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Deposit } from '../../deposits/entities/deposit.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'origin_id' })
  originId: string;

  @ManyToOne(() => Deposit)
  @JoinColumn({ name: 'origin_id' })
  origin: Deposit;

  @Column({ name: 'destination_id' })
  destinationId: string;

  @ManyToOne(() => Deposit)
  @JoinColumn({ name: 'destination_id' })
  destination: Deposit;

  @Column()
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
} 