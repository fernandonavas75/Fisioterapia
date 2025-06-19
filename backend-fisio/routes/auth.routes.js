const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Registro de nuevo usuario
router.post('/register', async (req, res) => {
  try {
    const { nombre_completo, correo, contrasena, rol } = req.body;

    const existe = await Usuario.findOne({ where: { correo } });
    if (existe) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = await Usuario.create({
      nombre_completo,
      correo,
      contrasena: hash,
      rol
    });

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuario: {
        id_usuario: nuevoUsuario.id_usuario,
        nombre_completo: nuevoUsuario.nombre_completo,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor', error });
  }
});

// 🚀 Login de usuario
router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({ token, usuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

module.exports = router;
