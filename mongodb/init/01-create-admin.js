db = db.getSiblingDB('LpFenix');

// Verifica se já existe um admin
const adminExists = db.admins.findOne({ email: 'admin@fenixtelecom.com.br' });

if (!adminExists) {
    // Cria o admin se não existir
    db.admins.insertOne({
        name: 'Admin Fenix',
        email: 'admin@fenixtelecom.com.br',
        // Senha: LAfenix12
        password: '$2b$10$hhLnBUcVjw9Qo6hGl3QzKOE/5fPzQOc.oYQI1YLKdVW7QsM2Wz8Hy',
        role: 'admin',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    print('Admin criado com sucesso!');
} else {
    print('Admin já existe!');
} 