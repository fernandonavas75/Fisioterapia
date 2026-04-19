const Seguimiento = require('../models/Seguimiento');

// CREATE
exports.crearSeguimiento = async (req, res) => {
  try {
    const seguimiento = await Seguimiento.create(req.body);
    res.status(201).json(seguimiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear seguimiento' });
  }
};

// READ ALL
exports.obtenerSeguimientos = async (req, res) => {
  try {
    const seguimientos = await Seguimiento.findAll();
    res.json(seguimientos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener seguimientos' });
  }
};

// READ ONE
exports.obtenerSeguimientoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const seguimiento = await Seguimiento.findByPk(id);
    if (!seguimiento) {
      return res.status(404).json({ mensaje: 'Seguimiento no encontrado' });
    }
    res.json(seguimiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener seguimiento' });
  }
};

// UPDATE
exports.actualizarSeguimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const seguimiento = await Seguimiento.findByPk(id);
    if (!seguimiento) {
      return res.status(404).json({ mensaje: 'Seguimiento no encontrado' });
    }

    await seguimiento.update(req.body);
    res.json(seguimiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar seguimiento' });
  }
};

// DELETE
exports.eliminarSeguimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const seguimiento = await Seguimiento.findByPk(id);
    if (!seguimiento) {
      return res.status(404).json({ mensaje: 'Seguimiento no encontrado' });
    }

    await seguimiento.destroy();
    res.json({ mensaje: 'Seguimiento eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar seguimiento' });
  }
};
