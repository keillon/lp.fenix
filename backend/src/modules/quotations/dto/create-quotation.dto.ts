import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class VolumeDto {
  @ApiProperty({ description: 'Quantidade do volume' })
  @IsNotEmpty()
  @IsString()
  qtde: string;

  @ApiProperty({ description: 'Altura do volume' })
  @IsNotEmpty()
  @IsString()
  altura: string;

  @ApiProperty({ description: 'Largura do volume' })
  @IsNotEmpty()
  @IsString()
  largura: string;

  @ApiProperty({ description: 'Comprimento do volume' })
  @IsNotEmpty()
  @IsString()
  comprimento: string;
}

export class CreateQuotationDto {
  @ApiProperty({ description: 'Cidade de origem' })
  @IsNotEmpty()
  @IsString()
  originCity: string;

  @ApiProperty({ description: 'Estado de origem' })
  @IsNotEmpty()
  @IsString()
  originState: string;

  @ApiProperty({ description: 'Cidade de destino' })
  @IsNotEmpty()
  @IsString()
  destinationCity: string;

  @ApiProperty({ description: 'Estado de destino' })
  @IsNotEmpty()
  @IsString()
  destinationState: string;

  @ApiProperty({ description: 'Peso da carga' })
  @IsNotEmpty()
  @IsString()
  cargoWeight: string;

  @ApiProperty({ description: 'Indica se a carga está paletizada' })
  @IsNotEmpty()
  @IsString()
  palletized: string;

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

  @ApiProperty({ description: 'Nome completo do solicitante' })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Email do solicitante' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Telefone do solicitante' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'CNPJ da empresa' })
  @IsNotEmpty()
  @IsString()
  cnpj: string;

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