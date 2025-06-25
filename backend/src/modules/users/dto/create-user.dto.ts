import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email do usuário' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'Perfil do usuário', enum: ['admin', 'manager', 'user'], default: 'user' })
  @IsOptional()
  @IsEnum(['admin', 'manager', 'user'])
  role?: 'admin' | 'manager' | 'user';

  @ApiProperty({ description: 'Indica se o usuário está ativo', default: true })
  @IsOptional()
  isActive?: boolean;
} 