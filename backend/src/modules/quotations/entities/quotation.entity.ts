import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('quotations')
export class Quotation {
  @ApiProperty({ description: 'ID único da cotação' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ApiProperty({ description: 'Cidade de origem' })
  @Column()
  originCity: string;
  
  @ApiProperty({ description: 'Estado de origem' })
  @Column()
  originState: string;
  
  @ApiProperty({ description: 'Cidade de destino' })
  @Column()
  destinationCity: string;
  
  @ApiProperty({ description: 'Estado de destino' })
  @Column()
  destinationState: string;
  
  @ApiProperty({ description: 'Peso da carga' })
  @Column()
  cargoWeight: string;
  
  @ApiProperty({ description: 'Indica se a carga está paletizada' })
  @Column()
  palletized: string;
  
  @ApiProperty({ description: 'Quantidade de paletes (se aplicável)', required: false })
  @Column({ nullable: true })
  palletQuantity?: string;
  
  @ApiProperty({ description: 'Volumes da carga' })
  @Column('jsonb', { nullable: false, default: () => "'[]'" })
  volumes: {
    qtde: string;
    altura: string;
    largura: string;
    comprimento: string;
  }[];
  
  @ApiProperty({ description: 'Volume total' })
  @Column('float', { nullable: false, default: 0 })
  totalVolume: number;
  
  @ApiProperty({ description: 'Nome completo do solicitante' })
  @Column()
  fullName: string;
  
  @ApiProperty({ description: 'Email do solicitante' })
  @Column()
  email: string;
  
  @ApiProperty({ description: 'Telefone do solicitante' })
  @Column()
  phone: string;
  
  @ApiProperty({ description: 'CNPJ da empresa' })
  @Column()
  cnpj: string;
  
  @ApiProperty({ description: 'Status da cotação' })
  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  })
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  
  @ApiProperty({ description: 'Valor da cotação', required: false })
  @Column({ nullable: true })
  value?: string;
  
  @ApiProperty({ description: 'Mensagem/observação', required: false })
  @Column({ nullable: true })
  message?: string;
  
  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn()
  createdAt: Date;
  
  @ApiProperty({ description: 'Data da última atualização' })
  @UpdateDateColumn()
  updatedAt: Date;
} 