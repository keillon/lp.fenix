import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'Nome do usuário', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Email do usuário', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Senha do usuário', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ description: 'Perfil do usuário', enum: ['admin', 'manager', 'user'], required: false })
  @IsOptional()
  @IsEnum(['admin', 'manager', 'user'])
  role?: 'admin' | 'manager' | 'user';

  @ApiProperty({ description: 'Indica se o usuário está ativo', required: false })
  @IsOptional()
  isActive?: boolean;
} 