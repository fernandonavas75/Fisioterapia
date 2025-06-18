const pacienteService = require('../services/paciente.service');

exports.obtenerTodos = async (req, res) => {
  try {
    const pacientes = await pacienteService.obtenerTodos();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevoPaciente = await pacienteService.crear(req.body);
    res.status(201).json(nuevoPaciente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const actualizado = await pacienteService.actualizar(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await pacienteService.eliminar(req.params.id);
    res.json({ mensaje: 'Paciente eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
