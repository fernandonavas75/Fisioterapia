const verifyRole = (rolesPermitidos = []) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado. Rol insuficiente.' });
    }
    next();
  };
};

module.exports = verifyRole;
// Este middleware verifica si el rol del usuario está en la lista de roles permitidos.
// Si no lo está, se envía un error 403. Si lo está, se permite continuar con la solicitud.
// Puedes usarlo en tus rutas de Express para protegerlas según el rol del usuario.