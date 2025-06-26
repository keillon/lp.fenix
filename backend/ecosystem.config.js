// fenix-telecom/backend/ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "fenix_backend",
      script: "server.js",       // Arquivo principal do seu backend
      instances: "max",          // Modo cluster: usar todas as CPUs disponíveis
      exec_mode: "cluster",      // Executa em modo cluster
      env: {
        NODE_ENV: "production",
        PORT: 5000,
        JWT_SECRET: "6Iy4PrNsYrkFJ75shNBFbphdwJ13yyW2i9avl4GYL-w=",
        MONGO_URI: "mongodb://appuser:password123@mongodb:27017/LpFenix?authSource=admin"
      },
      // Caminhos de logs dentro do host/container
      error_file: "./logs/pm2.err.log",
      out_file: "./logs/pm2.out.log",
      merge_logs: true,
      autorestart: true,
      watch: false
    }
  ]
};
