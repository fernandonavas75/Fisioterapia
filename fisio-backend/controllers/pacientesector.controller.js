const PacienteSector = require('../models/PacienteSector');

// CREATE
exports.crearPacienteSector = async (req, res) => {
  try {
    const nuevoRegistro = await PacienteSector.create(req.body);
    res.status(201).json(nuevoRegistro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear asignación Paciente-Sector' });
  }
};

// READ ALL
exports.obtenerTodos = async (req, res) => {
  try {
    const registros = await PacienteSector.findAll();
    res.json(registros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las asignaciones' });
  }
};

// READ ONE
exports.obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await PacienteSector.findByPk(id);
    if (!registro) {
      return res.status(404).json({ mensaje: 'Asignación no encontrada' });
    }
    res.json(registro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la asignación' });
  }
};

// UPDATE
exports.actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await PacienteSector.findByPk(id);
    if (!registro) {
      return res.status(404).json({ mensaje: 'Asignación no encontrada' });
    }

    await registro.update(req.body);
    res.json(registro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la asignación' });
  }
};

// DELETE
exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await PacienteSector.findByPk(id);
    if (!registro) {
      return res.status(404).json({ mensaje: 'Asignación no encontrada' });
    }

    await registro.destroy();
    res.json({ mensaje: 'Asignación eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la asignación' });
  }
};
