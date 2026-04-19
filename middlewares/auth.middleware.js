const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'supersecreto';

function verificarTokenMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Token no enviado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
}

module.exports = { verificarTokenMiddleware };
// This middleware function checks for a JWT in the Authorization header of incoming requests.
// If the token is present, it verifies it using a secret key and decodes the payload.
// If the token is valid, it attaches the decoded user information to the request object and calls the next middleware.
// If the token is missing or invalid, it responds with a 401 Unauthorized status and an error message.