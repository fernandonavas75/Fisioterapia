const antecedentesService = require('../services/antecedentes.service');

exports.obtenerTodos = async (req, res) => {
  try {
    const registros = await antecedentesService.obtenerTodos();
    res.json(registros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const creado = await antecedentesService.crear(req.body);
    res.status(201).json(creado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const actualizado = await antecedentesService.actualizar(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await antecedentesService.eliminar(req.params.id);
    res.json({ mensaje: 'Antecedentes eliminados correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
