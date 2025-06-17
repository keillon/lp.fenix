// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

/**
 * authMiddleware - Middleware para verificar o token JWT enviado no cabeçalho Authorization.
 *
 * Uso:
 *   app.get('/rota-protegida', authMiddleware, (req, res) => { ... });
 */
module.exports = function authMiddleware(req, res, next) {
  try {
    const header = req.header('Authorization');
    if (!header) {
      return res.status(401).json({ success: false, message: 'Token não fornecido.' });
    }

    const token = header.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Token ausente ou inválido.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.admin;
    next();
  } catch (error) {
    console.error('Erro no authMiddleware:', error);
    return res.status(401).json({ success: false, message: 'Token inválido ou expirado.' });
  }
};
