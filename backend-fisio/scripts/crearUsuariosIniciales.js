const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const sequelize = require('../config/database');

async function crearUsuariosIniciales() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida');

    const usuarios = [
      {
        nombre_completo: 'Administrador General',
        correo: 'admin@example.com',
        rol: 'admin',
        contrasena: await bcrypt.hash('123456', 10)
      },
      {
        nombre_completo: 'Estudiante Ejemplo',
        correo: 'estudiante@example.com',
        rol: 'estudiante',
        contrasena: await bcrypt.hash('123456', 10)
      },
      {
        nombre_completo: 'Luis Salazar',
        correo: 'luis@example.com',
        rol: 'estudiante',
        contrasena: await bcrypt.hash('123456', 10)
      },
      {
        nombre_completo: 'Francisco Dias',
        correo: 'francisco@example.com',
        rol: 'estudiante',
        contrasena: await bcrypt.hash('123456', 10)
      },
      {
        nombre_completo: 'Fernando Navas',
        correo: 'fernando@example.com',
        rol: 'estudiante',
        contrasena: await bcrypt.hash('123456', 10)
      }
    ];

    for (const user of usuarios) {
      const existente = await Usuario.findOne({ where: { correo: user.correo } });
      if (!existente) {
        await Usuario.create(user);
        console.log(`🟢 Usuario creado: ${user.correo}`);
      } else {
        console.log(`🔁 Ya existe: ${user.correo}`);
      }
    }
  } catch (error) {
    console.error('❌ Error al crear los usuarios:', error);
  } finally {
    await sequelize.close();
  }
}

crearUsuariosIniciales();
