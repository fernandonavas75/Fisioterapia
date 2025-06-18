const service = require('../services/informeFinal.service');

exports.obtenerTodos = async (req, res) => {
  try {
    const registros = await service.obtenerTodos();
    res.json(registros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const creado = await service.crear(req.body);
    res.status(201).json(creado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const actualizado = await service.actualizar(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await service.eliminar(req.params.id);
    res.json({ mensaje: 'Informe eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
