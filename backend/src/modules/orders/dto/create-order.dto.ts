import { IsString, IsNumber, IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'ID do cliente' })
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ description: 'ID do depósito de origem' })
  @IsUUID()
  @IsNotEmpty()
  originId: string;

  @ApiProperty({ description: 'ID do depósito de destino' })
  @IsUUID()
  @IsNotEmpty()
  destinationId: string;

  @ApiProperty({ description: 'Status do pedido' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'Valor do pedido' })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({ description: 'Descrição do pedido' })
  @IsString()
  @IsNotEmpty()
  description: string;
} 