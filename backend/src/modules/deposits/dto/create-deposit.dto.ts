import { IsString, IsOptional, IsEnum, IsNumber, IsBoolean, IsEmail, IsObject, IsArray } from 'class-validator';

export class CreateDepositDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsEnum(['PRINCIPAL', 'SECUNDARIO', 'TEMPORARIO'])
  type: 'PRINCIPAL' | 'SECUNDARIO' | 'TEMPORARIO';

  @IsEnum(['ATIVO', 'INATIVO', 'MANUTENCAO'])
  @IsOptional()
  status?: 'ATIVO' | 'INATIVO' | 'MANUTENCAO';

  // Endereço
  @IsString() street: string;
  @IsString() number: string;
  @IsOptional() @IsString() complement?: string;
  @IsString() neighborhood: string;
  @IsString() city: string;
  @IsString() state: string;
  @IsString() country: string;
  @IsString() zipCode: string;
  @IsOptional() @IsNumber() latitude?: number;
  @IsOptional() @IsNumber() longitude?: number;

  // Contato
  @IsString() phone: string;
  @IsEmail() email: string;
  @IsString() responsible: string;

  // Capacidade
  @IsNumber() capacityTotal: number;
  @IsOptional() @IsNumber() capacityUsed?: number;
  @IsEnum(['M3', 'TON', 'PALLETS']) capacityUnit: 'M3' | 'TON' | 'PALLETS';

  // Facilidades
  @IsOptional() @IsBoolean() hasDock?: boolean;
  @IsOptional() @IsBoolean() hasSecurity?: boolean;
  @IsOptional() @IsBoolean() hasClimateControl?: boolean;
  @IsOptional() @IsBoolean() hasForklift?: boolean;
  @IsOptional() @IsBoolean() hasLoadingArea?: boolean;
  @IsOptional() @IsBoolean() hasUnloadingArea?: boolean;
  @IsOptional() @IsBoolean() hasParking?: boolean;
  @IsOptional() @IsBoolean() hasOffice?: boolean;

  // Horário de funcionamento
  @IsOptional() @IsObject() operatingHours?: Record<string, { open: string; close: string }>;

  // Documentos
  @IsOptional() @IsArray() documents?: Array<{ name: string; type: string; url: string; expiryDate?: Date }>;

  @IsOptional() @IsString() notes?: string;
} 