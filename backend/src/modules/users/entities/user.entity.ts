import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @ApiProperty({ description: 'ID único do usuário' })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @ApiProperty({ description: 'Nome do usuário' })
  @Column()
  name: string;
  
  @ApiProperty({ description: 'Email do usuário (usado para login)' })
  @Column({ unique: true })
  email: string;
  
  @Column()
  password: string;
  
  @ApiProperty({ description: 'Perfil do usuário' })
  @Column({
    type: 'enum',
    enum: ['admin', 'manager', 'user'],
    default: 'user'
  })
  role: 'admin' | 'manager' | 'user';
  
  @ApiProperty({ description: 'Indica se o usuário está ativo' })
  @Column({ default: true })
  isActive: boolean;
  
  @ApiProperty({ description: 'Data da última autenticação', required: false })
  @Column({ nullable: true })
  lastLogin?: Date;
  
  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn()
  createdAt: Date;
  
  @ApiProperty({ description: 'Data da última atualização' })
  @UpdateDateColumn()
  updatedAt: Date;
  
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
} 