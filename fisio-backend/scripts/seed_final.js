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

    // Limpiar tablas
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

    // Pacientes
    const paciente = await Paciente.create({
      nombres: 'María',
      apellidos: 'Lopez',
      genero: 'Femenino',
      fecha_nacimiento: '2010-05-15'
    });

    console.log('✅ Pacientes insertados.');

    // Sectores
    const sector = await Sector.create({
      nombre: 'Sector Norte',
      descripcion: 'Zona geográfica norte'
    });

    console.log('✅ Sectores insertados.');

    // Historia Clínica
    const historia = await HistoriaClinica.create({
      id_paciente: paciente.id_paciente,
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

    console.log('✅ Historia Clínica insertada.');

    // Antecedentes
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

    console.log('✅ Antecedentes insertados.');

    // Evaluacion Postural
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

    console.log('✅ Evaluación Postural insertada.');

    // Evaluacion Funcional
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

    console.log('✅ Evaluación Funcional insertada.');

    // Fuerza Muscular
    await FuerzaMuscular.create({
      id_historia: historia.id_historia,
      zona_anatomica: 'Miembro Inferior',
      grupo_muscular: 'Cuádriceps',
      musculos: 'Recto Femoral, Vasto Medio',
      grado: 4
    });

    console.log('✅ Fuerza Muscular insertada.');

    // Pruebas Específicas
    await PruebasEspecificas.create({
      id_historia: historia.id_historia,
      adams_test: 'Negativo',
      jack_test: 'Negativo',
      otras_pruebas: 'Prueba de extensión lumbar sin dolor'
    });

    console.log('✅ Pruebas Específicas insertadas.');

    // Seguimiento
    await Seguimiento.create({
      id_historia: historia.id_historia,
      id_estudiante: estudiante.id_usuario,
      fecha: new Date(),
      intervenciones: 'Ejercicios de estiramiento lumbar',
      observaciones: 'Buena evolución'
    });

    console.log('✅ Seguimiento insertado.');

    // Informe Final
    await InformeFinal.create({
      titulo: 'Informe Individual',
      tipo_informe: 'individual',
      id_usuario: admin.id_usuario,
      enlace_pdf: '/reportes/individual_01.pdf'
    });

    console.log('✅ Informe Final insertado.');

    // Firmas Consentimientos
    await FirmasConsentimientos.create({
      id_historia: historia.id_historia,
      nombre_evaluador: 'Juan Pérez',
      firma_evaluador: 'data:image/png;base64,...',
      nombre_tutor: 'Carlos Martínez',
      firma_tutor: 'data:image/png;base64,...'
    });

    console.log('✅ Firmas insertadas.');

    // PacienteEstudiante
    await PacienteEstudiante.create({
      id_paciente: paciente.id_paciente,
      id_estudiante: estudiante.id_usuario
    });

    console.log('✅ PacienteEstudiante insertado.');

    // PacienteSector
    await PacienteSector.create({
      id_paciente: paciente.id_paciente,
      id_sector: sector.id_sector
    });

    console.log('✅ PacienteSector insertado.');

    console.log('\n🎉 Seed Final ejecutado correctamente.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    process.exit(1);
  }
}

seed();
