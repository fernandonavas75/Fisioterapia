const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // 👇 LOGS para depuración
    console.log('🔐 Contraseña ingresada:', contrasena);
    console.log('🧊 Hash en la base de datos:', usuario.contrasena);

    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    console.log('✅ Resultado de bcrypt.compare:', esValida); // debería ser true si coincide

    if (!esValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre_completo: usuario.nombre_completo,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};
