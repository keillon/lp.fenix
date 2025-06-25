import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRepresentativeDto {
  @ApiProperty({ description: 'Nome completo do representante' })
  @IsNotEmpty()
  @IsString()
  fullName: string;
  
  @ApiProperty({ description: 'Email do representante' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @ApiProperty({ description: 'Telefone do representante' })
  @IsNotEmpty()
  @IsString()
  phone: string;
  
  @ApiProperty({ description: 'CPF ou CNPJ do representante' })
  @IsNotEmpty()
  @IsString()
  cpfCnpj: string;
  
  @ApiProperty({ description: 'Cidade do representante' })
  @IsNotEmpty()
  @IsString()
  city: string;
  
  @ApiProperty({ description: 'Estado do representante' })
  @IsNotEmpty()
  @IsString()
  state: string;
  
  @ApiProperty({ description: 'Experiência do representante', required: false })
  @IsOptional()
  @IsString()
  experience?: string;
  
  @ApiProperty({ description: 'Área de cobertura', required: false })
  @IsOptional()
  @IsString()
  coverageArea?: string;
  
  @ApiProperty({ description: 'Mensagem/observação', required: false })
  @IsOptional()
  @IsString()
  message?: string;
  
  @ApiProperty({ description: 'Status do representante', required: false, enum: ['pending', 'approved', 'rejected'] })
  @IsOptional()
  @IsEnum(['pending', 'approved', 'rejected'])
  status?: 'pending' | 'approved' | 'rejected';
} 