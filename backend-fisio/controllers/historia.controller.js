const historiaService = require('../services/historia.service');

exports.obtenerTodas = async (req, res) => {
  try {
    const historias = await historiaService.obtenerTodas();
    res.json(historias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevaHistoria = await historiaService.crear(req.body);
    res.status(201).json(nuevaHistoria);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const historiaActualizada = await historiaService.actualizar(req.params.id, req.body);
    res.json(historiaActualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await historiaService.eliminar(req.params.id);
    res.json({ mensaje: 'Historia eliminada correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
