"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const users_service_1 = require("../modules/users/services/users.service");
const bcrypt = require("bcrypt");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const usersService = app.get(users_service_1.UsersService);
        const adminEmail = process.env.DB_ADMIN_EMAIL;
        const adminPassword = process.env.DB_ADMIN_PASSWORD;
        if (!adminEmail || !adminPassword) {
            throw new Error('DB_ADMIN_EMAIL e DB_ADMIN_PASSWORD devem estar definidos nas variáveis de ambiente.');
        }
        const existingAdmin = await usersService.findByEmail(adminEmail);
        if (!existingAdmin) {
            const adminUser = {
                name: 'Administrador',
                email: adminEmail,
                password: await bcrypt.hash(adminPassword, 10),
                role: 'admin',
                isActive: true,
            };
            const createdUser = await usersService.create(adminUser);
            console.log('Usuário admin criado com sucesso:', createdUser.id);
        }
        else {
            console.log('Usuário admin já existe:', existingAdmin.id);
        }
    }
    catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error.message);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=seed.js.map