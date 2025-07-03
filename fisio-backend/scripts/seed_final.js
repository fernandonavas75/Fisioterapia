require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

// MODELOS
const Usuario = require('../models/Usuario');
const Paciente = require('../models/Paciente');
const Sector = require('../models/Sector');
const HistoriaClinica = require('../models/HistoriaClinica');
const Antecedentes = require('../models/Antecedentes');
const EvaluacionPostural = require('../models/EvaluacionPostural');
const EvaluacionFuncional = require('../models/EvaluacionFuncional');
const FuerzaMuscular = require('../models/FuerzaMuscular');
const PruebasEspecificas = require('../models/PruebasEspecificas');
const Seguimiento = require('../models/Seguimiento');
const InformeFinal = require('../models/InformeFinal');
const FirmasConsentimientos = require('../models/FirmasConsentimientos');
const PacienteEstudiante = require('../models/PacienteEstudiante');
const PacienteSector = require('../models/PacienteSector');

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida.');

    await sequelize.sync({ force: true });
    console.log('✅ Tablas eliminadas y recreadas.');

    // Usuarios
    const adminHash = await bcrypt.hash('admin123', 10);
    const estudianteHash = await bcrypt.hash('estudiante123', 10);

    const admin = await Usuario.create({
      nombres: 'Fernando',
      apellidos: 'Navas',
      cedula: '0503211930',
      correo: 'admin@puce.edu.ec',
      rol: 'admin',
      contrasena: adminHash,
      conexion: new Date()
    });

    const estudiante = await Usuario.create({
      nombres: 'Juan',
      apellidos: 'Pérez',
      cedula: '0102030405',
      correo: 'estudiante@puce.edu.ec',
      rol: 'estudiante',
      contrasena: estudianteHash,
      conexion: new Date()
    });

    console.log('✅ Usuarios insertados.');

    // Sectores
    const sector = await Sector.create({
      nombre: 'Sector Norte',
      descripcion: 'Zona geográfica norte'
    });

    console.log('✅ Sectores insertados.');

    // -----------------------------
    // FICHA #1 - María Lopez
    // -----------------------------

    const paciente1 = await Paciente.create({
      nombres: 'María',
      apellidos: 'Lopez',
      genero: 'Femenino',
      fecha_nacimiento: '2010-05-15'
    });

    const historia1 = await HistoriaClinica.create({
      id_paciente: paciente1.id_paciente,
      id_estudiante: estudiante.id_usuario,
      edad: 13,
      peso: 42.5,
      estatura: 1.50,
      escuela: 'Unidad Educativa PUCE',
      grado: 'Octavo',
      nombres_tutor: 'Carlos',
      apellidos_tutor: 'Martínez',
      telefono_tutor: '0987654321',
      correo_tutor: 'carlos.martinez@correo.com',
      id_sector: sector.id_sector,
      fecha_evaluacion: '2023-10-10',
      motivo_consulta: 'Dolor lumbar persistente',
      inicio_sintomas: 'Hace 3 semanas',
      descripcion_sintomas: 'Dolor al agacharse o cargar peso.',
      estado: true
    });

    await crearModulosParaHistoria(historia1, estudiante, admin, paciente1, sector);
    console.log('✅ Ficha #1 insertada.');

    // -----------------------------
    // FICHA #2 - Pedro Torres
    // -----------------------------

    const paciente2 = await Paciente.create({
      nombres: 'Pedro',
      apellidos: 'Torres',
      genero: 'Masculino',
      fecha_nacimiento: '2008-03-12'
    });

    const historia2 = await HistoriaClinica.create({
      id_paciente: paciente2.id_paciente,
      id_estudiante: estudiante.id_usuario,
      edad: 15,
      peso: 55.0,
      estatura: 1.65,
      escuela: 'Colegio Central',
      grado: 'Décimo',
      nombres_tutor: 'Laura',
      apellidos_tutor: 'Gómez',
      telefono_tutor: '0988888888',
      correo_tutor: 'laura.gomez@correo.com',
      id_sector: sector.id_sector,
      fecha_evaluacion: '2024-02-15',
      motivo_consulta: 'Dolor de rodilla derecha',
      inicio_sintomas: 'Hace 1 mes',
      descripcion_sintomas: 'Dolor al correr y subir escaleras.',
      estado: false
    });

    await crearModulosParaHistoria(historia2, estudiante, admin, paciente2, sector);
    console.log('✅ Ficha #2 insertada.');

    // -----------------------------
    // FICHA #3 - Ana Castillo
    // -----------------------------

    const paciente3 = await Paciente.create({
      nombres: 'Ana',
      apellidos: 'Castillo',
      genero: 'Femenino',
      fecha_nacimiento: '2009-11-20'
    });

    const historia3 = await HistoriaClinica.create({
      id_paciente: paciente3.id_paciente,
      id_estudiante: estudiante.id_usuario,
      edad: 14,
      peso: 48.2,
      estatura: 1.58,
      escuela: 'Unidad Educativa América',
      grado: 'Noveno',
      nombres_tutor: 'José',
      apellidos_tutor: 'Castillo',
      telefono_tutor: '0977777777',
      correo_tutor: 'jose.castillo@correo.com',
      id_sector: sector.id_sector,
      fecha_evaluacion: '2024-04-01',
      motivo_consulta: 'Dolor cervical constante',
      inicio_sintomas: 'Hace 2 semanas',
      descripcion_sintomas: 'Dolor al girar la cabeza hacia la derecha.',
      estado: true
    });

    await crearModulosParaHistoria(historia3, estudiante, admin, paciente3, sector);
    console.log('✅ Ficha #3 insertada.');

    console.log('\n🎉 Seed Final ejecutado correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    process.exit(1);
  }
}

async function crearModulosParaHistoria(historia, estudiante, admin, paciente, sector) {
  await Antecedentes.create({
    id_historia: historia.id_historia,
    enfermedades_importantes: 'Asma',
    cirugias_previas: 'Apendicectomía',
    hospitalizaciones: 'Ninguna',
    alergias: 'Penicilina',
    medicamentos_actuales: 'Paracetamol',
    vacunacion_completa: true,
    enf_musculoesqueleticas_familia: 'Ninguna',
    condiciones_hereditarias: 'Hipertensión'
  });

  await EvaluacionPostural.create({
    id_historia: historia.id_historia,
    cabeza_cuello: 'Leve inclinación derecha',
    hombros: 'Simétricos',
    columna: 'Recta',
    pelvis: 'Nivelada',
    extremidades_inferiores: 'Alineadas',
    arco_plantar: 'Normal',
    puntos_dolorosos: 'Zona lumbar',
    eva_dolor: 3,
    tejidos_blandos: 'Sin alteraciones',
    estructuras_oseas: 'Sin deformidades'
  });

  await EvaluacionFuncional.create({
    id_historia: historia.id_historia,
    marcha_estado: 'Normal',
    marcha_descripcion: '',
    equilibrio_estado: 'Bueno',
    rango_movimiento_estado: 'Normal',
    rango_movimiento_areas: '',
    fuerza_muscular_estado: 'Normal',
    fuerza_muscular_areas: ''
  });

  await FuerzaMuscular.create({
    id_historia: historia.id_historia,
    zona_anatomica: 'Miembro Inferior',
    grupo_muscular: 'Cuádriceps',
    musculos: 'Recto Femoral, Vasto Medio',
    grado: 4
  });

  await PruebasEspecificas.create({
    id_historia: historia.id_historia,
    adams_test: 'Negativo',
    jack_test: 'Negativo',
    otras_pruebas: 'Prueba de extensión lumbar sin dolor'
  });

  await Seguimiento.create({
    id_historia: historia.id_historia,
    id_estudiante: estudiante.id_usuario,
    fecha: new Date(),
    intervenciones: 'Ejercicios de estiramiento lumbar',
    observaciones: 'Buena evolución'
  });

  await InformeFinal.create({
    titulo: 'Informe Individual',
    tipo_informe: 'individual',
    id_usuario: admin.id_usuario,
    enlace_pdf: '/reportes/individual_01.pdf'
  });

  await FirmasConsentimientos.create({
    id_historia: historia.id_historia,
    nombre_evaluador: 'Juan Pérez',
    firma_evaluador: 'data:image/png;base64,...',
    nombre_tutor: historia.nombres_tutor + ' ' + historia.apellidos_tutor,
    firma_tutor: 'data:image/png;base64,...'
  });

  await PacienteEstudiante.create({
    id_paciente: paciente.id_paciente,
    id_estudiante: estudiante.id_usuario
  });

  await PacienteSector.create({
    id_paciente: paciente.id_paciente,
    id_sector: sector.id_sector
  });
}

seed();
