// Script para inicializar o banco de dados com um usuário admin
// ATENÇÃO: Nunca exponha senhas em código! Use variáveis de ambiente.
// Exemplo de uso seguro:
// DB_ADMIN_EMAIL=admin@brprixx.com DB_ADMIN_PASSWORD=umaSenhaForte node dist/scripts/seed.js

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../modules/users/services/users.service';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const usersService = app.get(UsersService);

    // Use variáveis de ambiente para credenciais
    const adminEmail = process.env.DB_ADMIN_EMAIL;
    const adminPassword = process.env.DB_ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
      throw new Error('DB_ADMIN_EMAIL e DB_ADMIN_PASSWORD devem estar definidos nas variáveis de ambiente.');
    }

    // Verifica se já existe um usuário admin
    const existingAdmin = await usersService.findByEmail(adminEmail);
    if (!existingAdmin) {
      // Cria o usuário admin
      const adminUser: CreateUserDto = {
        name: 'Administrador',
        email: adminEmail,
        password: await bcrypt.hash(adminPassword, 10),
        role: 'admin' as 'admin' | 'manager' | 'user',
        isActive: true,
      };
      const createdUser = await usersService.create(adminUser);
      console.log('Usuário admin criado com sucesso:', createdUser.id);
    } else {
      console.log('Usuário admin já existe:', existingAdmin.id);
    }
  } catch (error) {
    // Nunca exponha stack trace ou dados sensíveis em produção
    console.error('Erro ao inicializar o banco de dados:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap(); 