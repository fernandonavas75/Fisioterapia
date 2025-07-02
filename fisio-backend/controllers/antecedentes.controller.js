const Antecedente = require('../models/Antecedentes');

// CREATE
exports.crearAntecedente = async (req, res) => {
  try {
    const antecedente = await Antecedente.create(req.body);
    res.status(201).json(antecedente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear antecedente' });
  }
};

// READ ALL
exports.obtenerAntecedentes = async (req, res) => {
  try {
    const antecedentes = await Antecedente.findAll();
    res.json(antecedentes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener antecedentes' });
  }
};

// READ ONE
exports.obtenerAntecedentePorId = async (req, res) => {
  try {
    const antecedente = await Antecedente.findByPk(req.params.id);
    if (!antecedente) {
      return res.status(404).json({ error: 'Antecedente no encontrado' });
    }
    res.json(antecedente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener antecedente' });
  }
};

// UPDATE
exports.actualizarAntecedente = async (req, res) => {
  try {
    const antecedente = await Antecedente.findByPk(req.params.id);
    if (!antecedente) {
      return res.status(404).json({ error: 'Antecedente no encontrado' });
    }
    await antecedente.update(req.body);
    res.json(antecedente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar antecedente' });
  }
};

// DELETE
exports.eliminarAntecedente = async (req, res) => {
  try {
    const antecedente = await Antecedente.findByPk(req.params.id);
    if (!antecedente) {
      return res.status(404).json({ error: 'Antecedente no encontrado' });
    }
    await antecedente.destroy();
    res.json({ mensaje: 'Antecedente eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar antecedente' });
  }
};
