import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { DataSource } from 'typeorm';

async function bootstrap() {
  // Criar logger para a aplicação
  const logger = new Logger('Bootstrap');

  // Iniciar a aplicação
  logger.log('Iniciando aplicação...');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  
  // Teste de conexão com o banco de dados
  logger.log('Testando conexão com o banco de dados...');
  try {
    // Em vez de getConnection, usar DataSource do NestJS
    const dataSource = app.get(DataSource);
    
    if (dataSource && dataSource.isInitialized) {
      // Teste a conexão com uma query simples
      const result = await dataSource.query('SELECT NOW() as time');
      
      logger.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
      logger.log('📊 Informações da conexão:');
      
      // Obter opções de conexão 
      const options = dataSource.options;
      
      logger.log(`   - Tipo: ${options.type || 'N/A'}`);
      logger.log(`   - Banco de dados: ${(options as any).database || 'N/A'}`);
      logger.log(`   - Host: ${(options as any).host || 'N/A'}`);
      logger.log(`   - Porta: ${(options as any).port || 'N/A'}`);
      logger.log(`   - Usuário: ${(options as any).username || (options as any).user || 'N/A'}`);
      logger.log(`   - Sincronização: ${(options as any).synchronize ? 'Ativada' : 'Desativada'}`);
      logger.log(`   - Timestamp do servidor: ${result[0].time}`);
      
      // Verificar a estrutura da tabela representatives
      try {
        const tablesResult = await dataSource.query(`
          SELECT tablename FROM pg_catalog.pg_tables 
          WHERE schemaname = 'public'
          ORDER BY tablename;
        `);
        
        logger.log('📑 Tabelas encontradas no banco de dados:');
        tablesResult.forEach((table: any) => {
          logger.log(`   - ${table.tablename}`);
        });
        
        // Verificar especificamente a tabela representatives
        const tableExists = tablesResult.some(
          (table: any) => table.tablename === 'representatives'
        );
        
        if (tableExists) {
          const columnsResult = await dataSource.query(`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns 
            WHERE table_name = 'representatives'
            ORDER BY ordinal_position;
          `);
          
          logger.log('📋 Estrutura da tabela representatives:');
          columnsResult.forEach((column: any) => {
            logger.log(`   - ${column.column_name} (${column.data_type}) ${column.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
          });
        } else {
          logger.warn('⚠️ Tabela representatives não encontrada no banco de dados');
          
          // Verificar sincronização
          if ((options as any).synchronize) {
            logger.log('Sincronização está ativada. A tabela será criada automaticamente.');
          } else {
            logger.warn('Sincronização está desativada. A tabela não será criada automaticamente.');
          }
        }
      } catch (tableError) {
        logger.error(`❌ Erro ao verificar estrutura das tabelas: ${tableError.message}`);
      }
      
      // Adicionar interceptador para log de consultas ao banco de dados
      try {
        // Usando o DataSource para logs de consultas
        const driver = dataSource.driver as any;
        if (driver && typeof driver === 'object') {
          driver.afterQueryExecute = (query: { query: string; parameters?: any[] }) => {
            const queryText = query.query.replace(/\s+/g, ' ').trim();
            const shortQuery = queryText.length > 100 ? `${queryText.substring(0, 100)}...` : queryText;
            const params = query.parameters ? JSON.stringify(query.parameters) : 'none';
            
            logger.debug(`🔍 Query executada: ${shortQuery} | Parâmetros: ${params}`);
          };
          logger.log('✅ Interceptador de consultas SQL configurado com sucesso');
        } else {
          logger.warn('⚠️ Não foi possível configurar o interceptador de consultas SQL');
        }
      } catch (interceptorError) {
        logger.warn(`⚠️ Erro ao configurar interceptador de consultas: ${interceptorError.message}`);
      }
    } else {
      throw new Error('DataSource não está inicializado.');
    }
  } catch (dbError) {
    logger.error('❌ Erro ao conectar com o banco de dados:');
    logger.error(`   - Mensagem: ${dbError.message}`);
    logger.error(`   - Código: ${dbError.code || 'N/A'}`);
    logger.error(`   - Tipo: ${dbError.name || 'N/A'}`);
    logger.error(`   - Stack: ${dbError.stack ? dbError.stack.split('\n').slice(0, 3).join('\n') : 'N/A'}`);
    
    logger.warn('⚠️ A aplicação continuará, mas operações de banco de dados podem falhar!');
    
    // Mostrar variáveis de ambiente (sem a senha)
    logger.log('🔄 Configurações de conexão através das variáveis de ambiente:');
    logger.log(`   - DB_HOST: ${process.env.DB_HOST || 'não definido'}`);
    logger.log(`   - DB_PORT: ${process.env.DB_PORT || 'não definido'}`);
    logger.log(`   - DB_DATABASE: ${process.env.DB_DATABASE || 'não definido'}`);
    logger.log(`   - DB_USERNAME: ${process.env.DB_USERNAME || 'não definido'}`);
    logger.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'não definido'}`);
    
    // Verificar se TypeORM está configurado em AppModule
    const fs = require('fs');
    try {
      if (fs.existsSync('./src/app.module.ts')) {
        const appModule = fs.readFileSync('./src/app.module.ts', 'utf8');
        if (appModule.includes('TypeOrmModule.forRoot')) {
          logger.log('   TypeOrmModule.forRoot foi encontrado em app.module.ts');
        } else {
          logger.log('   TypeOrmModule.forRoot NÃO foi encontrado em app.module.ts');
        }
      }
    } catch (fsError) {
      logger.error(`   Erro ao verificar arquivos: ${fsError.message}`);
    }
  }
  
  // Configuração do Helmet para segurança HTTP
  logger.log('Configurando Helmet para segurança...');
  app.use(helmet());
  
  // Configuração de CORS
  logger.log('Configurando CORS...');
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  
  // Configuração de validação global
  logger.log('Configurando validação global...');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  
  // Configuração de prefixo global para API
  logger.log('Configurando prefixo global para API...');
  app.setGlobalPrefix('api');
  
  // Configuração do Swagger
  logger.log('Configurando Swagger...');
  const config = new DocumentBuilder()
    .setTitle('BRPRIXX API')
    .setDescription('API para o sistema BRPRIXX de cotações e representantes')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  // Adicionar middleware para log de requisições
  app.use((req: any, res: any, next: () => void) => {
    const start = Date.now();
    
    // Log após a resposta ser enviada
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.log(`📝 ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
    });
    
    next();
  });
  
  // Inicializar aplicação
  const port = process.env.PORT || 5000;
  await app.listen(port);
  logger.log(`✅ Aplicação rodando com sucesso na porta ${port}`);
  logger.log(`📚 Documentação Swagger disponível em: http://localhost:${port}/api/docs`);
}

bootstrap().catch(err => {
  // Logger para erros durante a inicialização
  const logger = new Logger('Bootstrap');
  logger.error(`❌ Erro fatal durante a inicialização da aplicação: ${err.message}`);
  logger.error(`   - Stack: ${err.stack}`);
  process.exit(1);
});