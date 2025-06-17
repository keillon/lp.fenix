// backend/config/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Obtém a URI do Mongo a partir do .env (sem fallback)
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI não definida nas variáveis de ambiente.");
    }

    // Conecta ao MongoDB sem as opções depreciadas,
    // pois o driver 4.x já utiliza o novo parser e a topologia unificada por padrão.
    await mongoose.connect(uri);

    console.log("MongoDB conectado com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
    console.error("Certifique-se de que o MongoDB esteja online e as credenciais estejam corretas.");
    process.exit(1);
  }
};

module.exports = connectDB;
