import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateRepresentativeDto {
  @ApiProperty({ description: 'Nome completo do representante', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;
  
  @ApiProperty({ description: 'Email do representante', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;
  
  @ApiProperty({ description: 'Telefone do representante', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
  
  @ApiProperty({ description: 'CPF ou CNPJ do representante', required: false })
  @IsOptional()
  @IsString()
  cpfCnpj?: string;
  
  @ApiProperty({ description: 'Cidade do representante', required: false })
  @IsOptional()
  @IsString()
  city?: string;
  
  @ApiProperty({ description: 'Estado do representante', required: false })
  @IsOptional()
  @IsString()
  state?: string;
  
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