const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(403).json({ mensaje: 'Token no proporcionado o mal formado' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.usuario = decoded; // Ahora puedes usar req.usuario.rol, etc.
    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;
// Este middleware verifica el token JWT en las solicitudes entrantes.
// Si el token es válido, se decodifica y se agrega al objeto `req`.
// Si no es válido o no se proporciona, se envía un error 401 o 403.
// Asegúrate de que `process.env.JWT_SECRET` esté configurado en tu entorno de desarrollo o producción.
// Puedes usar este middleware en tus rutas para protegerlas, por ejemplo: