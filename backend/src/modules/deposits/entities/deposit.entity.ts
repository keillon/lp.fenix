import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('deposits')
export class Deposit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['PRINCIPAL', 'SECUNDARIO', 'TEMPORARIO'] })
  type: 'PRINCIPAL' | 'SECUNDARIO' | 'TEMPORARIO';

  @Column({ type: 'enum', enum: ['ATIVO', 'INATIVO', 'MANUTENCAO'], default: 'ATIVO' })
  status: 'ATIVO' | 'INATIVO' | 'MANUTENCAO';

  // Address
  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement?: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ default: 'Brasil' })
  country: string;

  @Column()
  zipCode: string;

  @Column('float', { nullable: true })
  latitude?: number;

  @Column('float', { nullable: true })
  longitude?: number;

  // Contact
  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  responsible: string;

  // Capacity
  @Column('float')
  capacityTotal: number;

  @Column('float', { default: 0 })
  capacityUsed: number;

  @Column({ type: 'enum', enum: ['M3', 'TON', 'PALLETS'] })
  capacityUnit: 'M3' | 'TON' | 'PALLETS';

  // Facilities
  @Column({ default: false })
  hasDock: boolean;

  @Column({ default: false })
  hasSecurity: boolean;

  @Column({ default: false })
  hasClimateControl: boolean;

  @Column({ default: false })
  hasForklift: boolean;

  @Column({ default: false })
  hasLoadingArea: boolean;

  @Column({ default: false })
  hasUnloadingArea: boolean;

  @Column({ default: false })
  hasParking: boolean;

  @Column({ default: false })
  hasOffice: boolean;

  // Operating hours (simple-json for compatibility)
  @Column('simple-json', { nullable: true })
  operatingHours?: Record<string, { open: string; close: string }>;

  // Documents (simple-json for compatibility)
  @Column('simple-json', { nullable: true })
  documents?: Array<{ name: string; type: string; url: string; expiryDate?: Date }>;

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 