import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('representatives')
export class Representative {
  @ApiProperty({ description: 'ID único do representante' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ApiProperty({ description: 'Nome completo do representante' })
  @Column()
  fullName: string;
  
  @ApiProperty({ description: 'Email do representante' })
  @Column()
  email: string;
  
  @ApiProperty({ description: 'Telefone do representante' })
  @Column()
  phone: string;
  
  @ApiProperty({ description: 'CPF ou CNPJ do representante' })
  @Column()
  cpfCnpj: string;
  
  @ApiProperty({ description: 'Cidade do representante' })
  @Column()
  city: string;
  
  @ApiProperty({ description: 'Estado do representante' })
  @Column()
  state: string;
  
  @ApiProperty({ description: 'Experiência do representante', required: false })
  @Column({ nullable: true })
  experience?: string;
  
  @ApiProperty({ description: 'Área de cobertura', required: false })
  @Column({ nullable: true })
  coverageArea?: string;
  
  @ApiProperty({ description: 'Mensagem/observação', required: false })
  @Column({ nullable: true })
  message?: string;
  
  @ApiProperty({ description: 'Status do representante' })
  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  })
  status: 'pending' | 'approved' | 'rejected';
  
  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn()
  createdAt: Date;
  
  @ApiProperty({ description: 'Data da última atualização' })
  @UpdateDateColumn()
  updatedAt: Date;
} 