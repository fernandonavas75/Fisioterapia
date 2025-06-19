const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const sequelize = require('../config/database');

async function crearUsuarioAdmin() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos ✅');

    const contrasenaHash = await bcrypt.hash('123456', 10);

    const admin = await Usuario.create({
      nombre_completo: 'Administrador',
      correo: 'admin@example.com',
      rol: 'admin',
      contrasena: contrasenaHash
    });

    console.log('🟢 Usuario administrador creado:', admin.correo);
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
  } finally {
    await sequelize.close();
  }
}

crearUsuarioAdmin();
