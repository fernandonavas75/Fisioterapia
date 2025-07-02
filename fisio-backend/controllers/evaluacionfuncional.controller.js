const EvaluacionFuncional = require('../models/EvaluacionFuncional');

// CREATE
exports.crearEvaluacionFuncional = async (req, res) => {
  try {
    const nuevaEvaluacion = await EvaluacionFuncional.create(req.body);
    res.status(201).json(nuevaEvaluacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear evaluación funcional' });
  }
};

// READ ALL
exports.obtenerEvaluacionesFuncionales = async (req, res) => {
  try {
    const evaluaciones = await EvaluacionFuncional.findAll();
    res.json(evaluaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener evaluaciones funcionales' });
  }
};

// READ ONE
exports.obtenerEvaluacionFuncionalPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluacion = await EvaluacionFuncional.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ mensaje: 'Evaluación funcional no encontrada' });
    }
    res.json(evaluacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener evaluación funcional' });
  }
};

// UPDATE
exports.actualizarEvaluacionFuncional = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluacion = await EvaluacionFuncional.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ mensaje: 'Evaluación funcional no encontrada' });
    }

    await evaluacion.update(req.body);
    res.json(evaluacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar evaluación funcional' });
  }
};

// DELETE
exports.eliminarEvaluacionFuncional = async (req, res) => {
  try {
    const { id } = req.params;
    const evaluacion = await EvaluacionFuncional.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ mensaje: 'Evaluación funcional no encontrada' });
    }

    await evaluacion.destroy();
    res.json({ mensaje: 'Evaluación funcional eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar evaluación funcional' });
  }
};
