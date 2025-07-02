const HistoriaClinica = require('../models/HistoriaClinica');
const { Op } = require('sequelize');

// CREATE
exports.crearHistoriaClinica = async (req, res) => {
  try {
    const historia = await HistoriaClinica.create(req.body);
    console.log('Historia clínica creada correctamente:', historia.id_historia);
    res.status(201).json(historia);
  } catch (error) {
    console.error('Error al crear la historia clínica:', error);
    res.status(500).json({ error: 'Error al crear la historia clínica' });
  }
};

// READ ALL
exports.obtenerHistoriasClinicas = async (req, res) => {
  try {
    const historias = await HistoriaClinica.findAll();
    console.log(`Se encontraron ${historias.length} historias clínicas.`);
    res.json(historias);
  } catch (error) {
    console.error('Error al obtener las historias clínicas:', error);
    res.status(500).json({ error: 'Error al obtener las historias clínicas' });
  }
};

// READ ONE
exports.obtenerHistoriaClinicaPorId = async (req, res) => {
  try {
    const historia = await HistoriaClinica.findByPk(req.params.id);
    if (!historia) {
      console.warn('Historia clínica no encontrada con ID:', req.params.id);
      return res.status(404).json({ error: 'Historia clínica no encontrada' });
    }
    res.json(historia);
  } catch (error) {
    console.error('Error al obtener la historia clínica:', error);
    res.status(500).json({ error: 'Error al obtener la historia clínica' });
  }
};

// UPDATE
exports.actualizarHistoriaClinica = async (req, res) => {
  try {
    const historia = await HistoriaClinica.findByPk(req.params.id);
    if (!historia) {
      console.warn('Historia clínica no encontrada con ID:', req.params.id);
      return res.status(404).json({ error: 'Historia clínica no encontrada' });
    }
    await historia.update(req.body);
    console.log('Historia clínica actualizada:', historia.id_historia);
    res.json(historia);
  } catch (error) {
    console.error('Error al actualizar la historia clínica:', error);
    res.status(500).json({ error: 'Error al actualizar la historia clínica' });
  }
};

// DELETE
exports.eliminarHistoriaClinica = async (req, res) => {
  try {
    const historia = await HistoriaClinica.findByPk(req.params.id);
    if (!historia) {
      console.warn('Historia clínica no encontrada con ID:', req.params.id);
      return res.status(404).json({ error: 'Historia clínica no encontrada' });
    }
    await historia.destroy();
    console.log('Historia clínica eliminada:', historia.id_historia);
    res.status(200).json({ mensaje: 'Historia clínica eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la historia clínica:', error);
    res.status(500).json({ error: 'Error al eliminar la historia clínica' });
  }
};

// BUSCAR POR PACIENTE
exports.obtenerHistoriasPorPaciente = async (req, res) => {
  try {
    const historias = await HistoriaClinica.findAll({
      where: { id_paciente: req.params.id_paciente }
    });
    if (historias.length === 0) {
      console.warn('No se encontraron historias para el paciente:', req.params.id_paciente);
      return res.status(404).json({ error: 'No se encontraron historias clínicas para este paciente' });
    }
    res.json(historias);
  } catch (error) {
    console.error('Error al obtener las historias clínicas por paciente:', error);
    res.status(500).json({ error: 'Error al obtener las historias clínicas por paciente' });
  }
};

// BUSCAR POR ESTUDIANTE
exports.obtenerHistoriasPorEstudiante = async (req, res) => {
  try {
    const historias = await HistoriaClinica.findAll({
      where: { id_estudiante: req.params.id_estudiante }
    });
    if (historias.length === 0) {
      console.warn('No se encontraron historias para el estudiante:', req.params.id_estudiante);
      return res.status(404).json({ error: 'No se encontraron historias clínicas para este estudiante' });
    }
    res.json(historias);
  } catch (error) {
    console.error('Error al obtener las historias clínicas por estudiante:', error);
    res.status(500).json({ error: 'Error al obtener las historias clínicas por estudiante' });
  }
};

// BUSCAR POR SECTOR
exports.obtenerHistoriasPorSector = async (req, res) => {
  try {
    const historias = await HistoriaClinica.findAll({
      where: { id_sector: req.params.id_sector }
    });
    if (historias.length === 0) {
      console.warn('No se encontraron historias para el sector:', req.params.id_sector);
      return res.status(404).json({ error: 'No se encontraron historias clínicas para este sector' });
    }
    res.json(historias);
  } catch (error) {
    console.error('Error al obtener las historias clínicas por sector:', error);
    res.status(500).json({ error: 'Error al obtener las historias clínicas por sector' });
  }
};

// BUSCAR POR RANGO DE FECHAS
exports.obtenerHistoriasPorRangoFechas = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ error: 'Debe proporcionar fechaInicio y fechaFin en la consulta.' });
    }

    const historias = await HistoriaClinica.findAll({
      where: {
        fecha_evaluacion: {
          [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
        }
      }
    });

    if (historias.length === 0) {
      console.warn('No se encontraron historias clínicas en el rango de fechas:', fechaInicio, '-', fechaFin);
      return res.status(404).json({ error: 'No se encontraron historias clínicas en este rango de fechas' });
    }

    res.json(historias);
  } catch (error) {
    console.error('Error al obtener las historias clínicas por rango de fechas:', error);
    res.status(500).json({ error: 'Error al obtener las historias clínicas por rango de fechas' });
  }
};
