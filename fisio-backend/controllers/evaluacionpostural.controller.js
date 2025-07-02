const EvaluacionPostural = require('../models/EvaluacionPostural');

// CREATE
exports.crearEvaluacionPostural = async (req, res) => {
  try {
    const nuevaEvaluacion = await EvaluacionPostural.create(req.body);
    res.status(201).json(nuevaEvaluacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear evaluación postural' });
  }
};

// READ ALL
exports.obtenerEvaluacionesPosturales = async (req, res) => {
  try {
    const evaluaciones = await EvaluacionPostural.findAll();
    res.json(evaluaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener evaluaciones posturales' });
  }
};

// READ ONE
exports.obtenerEvaluacionPosturalPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluacion = await EvaluacionPostural.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ mensaje: 'Evaluación postural no encontrada' });
    }
    res.json(evaluacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener evaluación postural' });
  }
};

// UPDATE
exports.actualizarEvaluacionPostural = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluacion = await EvaluacionPostural.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ mensaje: 'Evaluación postural no encontrada' });
    }

    await evaluacion.update(req.body);
    res.json(evaluacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar evaluación postural' });
  }
};

// DELETE
exports.eliminarEvaluacionPostural = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluacion = await EvaluacionPostural.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ mensaje: 'Evaluación postural no encontrada' });
    }

    await evaluacion.destroy();
    res.json({ mensaje: 'Evaluación postural eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar evaluación postural' });
  }
};
