require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
const Usuario = require('../models/Usuario');

async function seedUsuarios() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida');

    // Opcional: eliminar usuarios existentes
    await Usuario.destroy({ where: {} });
    console.log('Usuarios existentes eliminados');

    // Generar hashes
    const adminHash = await bcrypt.hash('admin123', 10);
    const estudianteHash = await bcrypt.hash('estudiante123', 10);

    await Usuario.create({
      nombres: 'Fernando',
      apellidos: 'Navas',
      cedula: '0503211930',
      correo: 'admin@puce.edu.ec',
      rol: 'admin',
      contrasena: adminHash,
      conexion: new Date()
    });

    await Usuario.create({
      nombres: 'Juan',
      apellidos: 'Pérez',
      cedula: '0102030405',
      correo: 'estudiante@puce.edu.ec',
      rol: 'estudiante',
      contrasena: estudianteHash,
      conexion: new Date()
    });

    console.log('Seed ejecutado correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('Error ejecutando seed:', error);
    process.exit(1);
  }
}

seedUsuarios();
