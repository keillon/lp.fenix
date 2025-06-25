"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const typeorm_1 = require("typeorm");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    logger.log('Iniciando aplicação...');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    logger.log('Testando conexão com o banco de dados...');
    try {
        const dataSource = app.get(typeorm_1.DataSource);
        if (dataSource && dataSource.isInitialized) {
            const result = await dataSource.query('SELECT NOW() as time');
            logger.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
            logger.log('📊 Informações da conexão:');
            const options = dataSource.options;
            logger.log(`   - Tipo: ${options.type || 'N/A'}`);
            logger.log(`   - Banco de dados: ${options.database || 'N/A'}`);
            logger.log(`   - Host: ${options.host || 'N/A'}`);
            logger.log(`   - Porta: ${options.port || 'N/A'}`);
            logger.log(`   - Usuário: ${options.username || options.user || 'N/A'}`);
            logger.log(`   - Sincronização: ${options.synchronize ? 'Ativada' : 'Desativada'}`);
            logger.log(`   - Timestamp do servidor: ${result[0].time}`);
            try {
                const tablesResult = await dataSource.query(`
          SELECT tablename FROM pg_catalog.pg_tables 
          WHERE schemaname = 'public'
          ORDER BY tablename;
        `);
                logger.log('📑 Tabelas encontradas no banco de dados:');
                tablesResult.forEach((table) => {
                    logger.log(`   - ${table.tablename}`);
                });
                const tableExists = tablesResult.some((table) => table.tablename === 'representatives');
                if (tableExists) {
                    const columnsResult = await dataSource.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'representatives'
            ORDER BY ordinal_position;
          `);
                    logger.log('📋 Estrutura da tabela representatives:');
                    columnsResult.forEach((column) => {
                        logger.log(`   - ${column.column_name} (${column.data_type}) ${column.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
                    });
                }
                else {
                    logger.warn('⚠️ Tabela representatives não encontrada no banco de dados');
                    if (options.synchronize) {
                        logger.log('Sincronização está ativada. A tabela será criada automaticamente.');
                    }
                    else {
                        logger.warn('Sincronização está desativada. A tabela não será criada automaticamente.');
                    }
                }
            }
            catch (tableError) {
                logger.error(`❌ Erro ao verificar estrutura das tabelas: ${tableError.message}`);
            }
            try {
                const driver = dataSource.driver;
                if (driver && typeof driver === 'object') {
                    driver.afterQueryExecute = (query) => {
                        const queryText = query.query.replace(/\s+/g, ' ').trim();
                        const shortQuery = queryText.length > 100 ? `${queryText.substring(0, 100)}...` : queryText;
                        const params = query.parameters ? JSON.stringify(query.parameters) : 'none';
                        logger.debug(`🔍 Query executada: ${shortQuery} | Parâmetros: ${params}`);
                    };
                    logger.log('✅ Interceptador de consultas SQL configurado com sucesso');
                }
                else {
                    logger.warn('⚠️ Não foi possível configurar o interceptador de consultas SQL');
                }
            }
            catch (interceptorError) {
                logger.warn(`⚠️ Erro ao configurar interceptador de consultas: ${interceptorError.message}`);
            }
        }
        else {
            throw new Error('DataSource não está inicializado.');
        }
    }
    catch (dbError) {
        logger.error('❌ Erro ao conectar com o banco de dados:');
        logger.error(`   - Mensagem: ${dbError.message}`);
        logger.error(`   - Código: ${dbError.code || 'N/A'}`);
        logger.error(`   - Tipo: ${dbError.name || 'N/A'}`);
        logger.error(`   - Stack: ${dbError.stack ? dbError.stack.split('\n').slice(0, 3).join('\n') : 'N/A'}`);
        logger.warn('⚠️ A aplicação continuará, mas operações de banco de dados podem falhar!');
        logger.log('🔄 Configurações de conexão através das variáveis de ambiente:');
        logger.log(`   - DB_HOST: ${process.env.DB_HOST || 'não definido'}`);
        logger.log(`   - DB_PORT: ${process.env.DB_PORT || 'não definido'}`);
        logger.log(`   - DB_DATABASE: ${process.env.DB_DATABASE || 'não definido'}`);
        logger.log(`   - DB_USERNAME: ${process.env.DB_USERNAME || 'não definido'}`);
        logger.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'não definido'}`);
        const fs = require('fs');
        try {
            if (fs.existsSync('./src/app.module.ts')) {
                const appModule = fs.readFileSync('./src/app.module.ts', 'utf8');
                if (appModule.includes('TypeOrmModule.forRoot')) {
                    logger.log('   TypeOrmModule.forRoot foi encontrado em app.module.ts');
                }
                else {
                    logger.log('   TypeOrmModule.forRoot NÃO foi encontrado em app.module.ts');
                }
            }
        }
        catch (fsError) {
            logger.error(`   Erro ao verificar arquivos: ${fsError.message}`);
        }
    }
    logger.log('Configurando Helmet para segurança...');
    app.use((0, helmet_1.default)());
    logger.log('Configurando CORS...');
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    });
    logger.log('Configurando validação global...');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    logger.log('Configurando prefixo global para API...');
    app.setGlobalPrefix('api');
    logger.log('Configurando Swagger...');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('BRPRIXX API')
        .setDescription('API para o sistema BRPRIXX de cotações e representantes')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    app.use((req, res, next) => {
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            logger.log(`📝 ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
        });
        next();
    });
    const port = process.env.PORT || 5000;
    await app.listen(port);
    logger.log(`✅ Aplicação rodando com sucesso na porta ${port}`);
    logger.log(`📚 Documentação Swagger disponível em: http://localhost:${port}/api/docs`);
}
bootstrap().catch(err => {
    const logger = new common_1.Logger('Bootstrap');
    logger.error(`❌ Erro fatal durante a inicialização da aplicação: ${err.message}`);
    logger.error(`   - Stack: ${err.stack}`);
    process.exit(1);
});
//# sourceMappingURL=main.js.map