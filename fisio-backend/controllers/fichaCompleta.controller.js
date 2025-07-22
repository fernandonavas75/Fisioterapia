// controllers/fichaCompleta.controller.js
const HistoriaClinica = require('../models/HistoriaClinica');
const EvaluacionPostural = require('../models/EvaluacionPostural');
const FuerzaMuscular = require('../models/FuerzaMuscular');
const PruebasFuncionales = require('../models/PruebasFuncionales');
const Seguimiento = require('../models/Seguimiento');
const { Op } = require('sequelize');

exports.crearFichaCompleta = async (req, res) => {
  try {
    console.log('JSON recibido:', req.body);

    // Crear la Historia Clínica
    const historia = await HistoriaClinica.create({
      id_paciente: Number(req.body.id_paciente), // <-- Asegurarse que es número
      id_estudiante: Number(req.body.id_estudiante),
      fecha_evaluacion: req.body.fecha_evaluacion,
      edad: req.body.edad,
      peso: req.body.peso,
      estatura: req.body.estatura,
      escuela: req.body.escuela,
      grado: req.body.grado,
      nombres_tutor: req.body.nombresTutor,
      telefono_tutor: req.body.telefono_tutor,
      correo_tutor: req.body.correo_tutor,
      objetivos: req.body.objetivos,
      ejercicios_fortalecimiento: req.body.fortalecimiento,
      ejercicios_estiramiento: req.body.estiramiento,
      reeducacion_postural: req.body.reeducacionPostural,
      otras_tecnicas: req.body.otrasTecnicas,
      uso_calzado_adecuado: req.body.calzadoAdecuado,
      actividades_fisicas: req.body.actividadesRecomendadas,
      restricciones_precauciones: req.body.restricciones
    });

    // Crear Evaluación Postural
    await EvaluacionPostural.create({
      id_historia: historia.id_historia,
      cabeza_cuello: req.body.cabezaCuello,
      hombros: req.body.hombros,
      columna: req.body.columna,
      pelvis: req.body.pelvis,
      extremidades: req.body.extremidades,
      arco_plantar: req.body.arcoPlantar
    });

    // Crear Fuerza Muscular
    await FuerzaMuscular.create({
      id_historia: historia.id_historia,
      ...req.body.tablaFuerzaMuscular
    });

    // Crear Pruebas Funcionales
    await PruebasFuncionales.create({
      id_historia: historia.id_historia,
      test_adams: req.body.testAdams,
      test_jack: req.body.testJack,
      otras_pruebas: req.body.otrasPruebas
    });

    // Crear Seguimiento 1
    await Seguimiento.create({
      id_historia: historia.id_historia,
      numero: 1,
      fecha: req.body.seguimiento1Fecha,
      observaciones: req.body.seguimiento1Observaciones
    });

    res.status(201).json({ mensaje: 'Ficha clínica guardada correctamente' });
  } catch (error) {
    console.error('Error al guardar la ficha completa:', error);
    res.status(500).json({ error: 'Error al guardar la ficha completa', detalles: error });
  }
};
