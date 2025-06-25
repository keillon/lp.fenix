import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ description: 'Nome da empresa' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'CNPJ da empresa' })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({ description: 'Nome do responsável' })
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @ApiProperty({ description: 'Telefone de contato' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'E-mail de contato' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Endereço completo' })
  @IsString()
  @IsNotEmpty()
  address: string;
} 