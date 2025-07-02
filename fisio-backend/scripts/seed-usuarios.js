require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');
const Usuario = require('../models/Usuario');
const Paciente = require('../models/Paciente');

async function seedData() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida.');

    /** -------------------------------------------
     * Usuarios
     * ----------------------------------------- */

    // Opcional: eliminar usuarios existentes
    await Usuario.destroy({ where: {} });
    console.log('🗑️  Usuarios existentes eliminados.');

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

    console.log('✅ Usuarios creados.');

    /** -------------------------------------------
     * Pacientes
     * ----------------------------------------- */

    // Opcional: eliminar pacientes existentes
    await Paciente.destroy({ where: {} });
    console.log('🗑️  Pacientes existentes eliminados.');

    await Paciente.create({
      nombres: 'Luis',
      apellidos: 'Martínez',
      genero: 'Masculino',
      fecha_nacimiento: '2010-05-20'
    });

    await Paciente.create({
      nombres: 'Ana',
      apellidos: 'García',
      genero: 'Femenino',
      fecha_nacimiento: '2012-08-15'
    });

    console.log('✅ Pacientes creados.');

    console.log('🌱 Seed ejecutado correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('🚫 Error ejecutando seed:', error);
    process.exit(1);
  }
}

seedData();
// Nota: Asegúrate de que la base de datos esté corriendo y las tablas estén sincronizadas antes de ejecutar este script.
// Puedes ejecutar este script con el comando: node scripts/seed-usuarios.js