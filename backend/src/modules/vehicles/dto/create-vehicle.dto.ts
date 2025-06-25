import { IsString, IsNumber, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ description: 'Placa do veículo' })
  @IsString()
  @IsNotEmpty()
  plate: string;

  @ApiProperty({ description: 'Modelo do veículo' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ description: 'Marca do veículo' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ description: 'Ano do veículo' })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ description: 'Capacidade do veículo em toneladas' })
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty({ description: 'Status do veículo' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'ID do motorista' })
  @IsUUID()
  @IsNotEmpty()
  driverId: string;
} 