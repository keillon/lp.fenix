import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { VolumeDto } from './create-quotation.dto';

export class UpdateQuotationDto {
  @ApiProperty({ description: 'Cidade de origem', required: false })
  @IsOptional()
  @IsString()
  originCity?: string;

  @ApiProperty({ description: 'Estado de origem', required: false })
  @IsOptional()
  @IsString()
  originState?: string;

  @ApiProperty({ description: 'Cidade de destino', required: false })
  @IsOptional()
  @IsString()
  destinationCity?: string;

  @ApiProperty({ description: 'Estado de destino', required: false })
  @IsOptional()
  @IsString()
  destinationState?: string;

  @ApiProperty({ description: 'Peso da carga', required: false })
  @IsOptional()
  @IsString()
  cargoWeight?: string;

  @ApiProperty({ description: 'Indica se a carga está paletizada', required: false })
  @IsOptional()
  @IsString()
  palletized?: string;

  @ApiProperty({ description: 'Quantidade de paletes (se aplicável)', required: false })
  @IsOptional()
  @IsString()
  palletQuantity?: string;

  @ApiProperty({ description: 'Volumes da carga', type: [VolumeDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VolumeDto)
  volumes?: VolumeDto[];

  @ApiProperty({ description: 'Volume total', required: false })
  @IsOptional()
  @IsNumber()
  totalVolume?: number;

  @ApiProperty({ description: 'Nome completo do solicitante', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ description: 'Email do solicitante', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Telefone do solicitante', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'CNPJ da empresa', required: false })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiProperty({ description: 'Status da cotação', required: false, enum: ['pending', 'approved', 'rejected', 'completed', 'cancelled'] })
  @IsOptional()
  @IsEnum(['pending', 'approved', 'rejected', 'completed', 'cancelled'])
  status?: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';

  @ApiProperty({ description: 'Valor da cotação', required: false })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiProperty({ description: 'Mensagem/observação', required: false })
  @IsOptional()
  @IsString()
  message?: string;
} 