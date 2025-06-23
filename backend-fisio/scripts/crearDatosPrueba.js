const sequelize = require('../config/database');
const Paciente = require('../models/Paciente');
const Usuario = require('../models/Usuario');
const HistoriaClinica = require('../models/HistoriaClinica');
require('../models/associations');

async function crearDatosPrueba() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a la base de datos');

    // Verifica si ya existen pacientes
    const pacientesExistentes = await Paciente.findAll();
    if (pacientesExistentes.length === 0) {
      // Insertar pacientes
      const pacientes = await Paciente.bulkCreate([
        {
          nombres: 'Juan',
          apellidos: 'Martínez',
          edad: 10,
          genero: 'Masculino',
          peso: 32.5,
          estatura: 1.35,
          fecha_nacimiento: '2014-05-10',
          escuela: 'Escuela Central',
          grado: '5to',
          nombre_tutor: 'Pedro Martínez',
          telefono_tutor: '0999999999',
          correo_tutor: 'pedro.tutor@example.com'
        },
        {
          nombres: 'Lucía',
          apellidos: 'Rodríguez',
          edad: 9,
          genero: 'Femenino',
          peso: 29.0,
          estatura: 1.3,
          fecha_nacimiento: '2015-03-12',
          escuela: 'Escuela Aurora',
          grado: '4to',
          nombre_tutor: 'Marta Rodríguez',
          telefono_tutor: '0988888888',
          correo_tutor: 'marta.tutor@example.com'
        }
      ]);
      console.log('🟢 Pacientes insertados');
    } else {
      console.log('🔁 Pacientes ya existentes, omitiendo inserción');
    }

    // Obtener estudiante por correo
    const estudiante = await Usuario.findOne({ where: { correo: 'estudiante@example.com' } });
    if (!estudiante) {
      throw new Error('❌ No se encontró el usuario estudiante@example.com');
    }

    const historiasExistentes = await HistoriaClinica.findAll();
    if (historiasExistentes.length === 0) {
      // Insertar historias clínicas
      const historias = await HistoriaClinica.bulkCreate([
        {
          id_paciente: 1,
          id_estudiante: estudiante.id_usuario,
          fecha_evaluacion: new Date('2024-06-15'),
          motivo_consulta: 'Dolor lumbar leve',
          historia_condicion_actual: 'Dolor en zona lumbar tras caída.',
          diagnostico_preliminar: 'Lumbalgia aguda',
          plan_intervencion: 'Fisioterapia 2 veces por semana'
        },
        {
          id_paciente: 2,
          id_estudiante: estudiante.id_usuario,
          fecha_evaluacion: new Date('2024-06-16'),
          motivo_consulta: 'Dolor de cuello',
          historia_condicion_actual: 'Postura incorrecta prolongada.',
          diagnostico_preliminar: 'Cervicalgia postural',
          plan_intervencion: 'Reeducación postural y ejercicios de estiramiento'
        }
      ]);
      console.log('🟢 Historias clínicas insertadas');
    } else {
      console.log('🔁 Historias clínicas ya existen');
    }

  } catch (error) {
    console.error('❌ Error al insertar datos de prueba:', error.message);
  } finally {
    await sequelize.close();
  }
}

crearDatosPrueba();
