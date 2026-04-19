const FuerzaMuscular = require('../models/FuerzaMuscular');

// CREATE
exports.crearFuerzaMuscular = async (req, res) => {
  try {
    const nuevaFuerza = await FuerzaMuscular.create(req.body);
    res.status(201).json(nuevaFuerza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear fuerza muscular' });
  }
};

// READ ALL
exports.obtenerFuerzasMusculares = async (req, res) => {
  try {
    const fuerzas = await FuerzaMuscular.findAll();
    res.json(fuerzas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener fuerzas musculares' });
  }
};

// READ ONE
exports.obtenerFuerzaMuscularPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const fuerza = await FuerzaMuscular.findByPk(id);
    if (!fuerza) {
      return res.status(404).json({ mensaje: 'Fuerza muscular no encontrada' });
    }
    res.json(fuerza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener fuerza muscular' });
  }
};

// UPDATE
exports.actualizarFuerzaMuscular = async (req, res) => {
  try {
    const { id } = req.params;
    const fuerza = await FuerzaMuscular.findByPk(id);
    if (!fuerza) {
      return res.status(404).json({ mensaje: 'Fuerza muscular no encontrada' });
    }

    await fuerza.update(req.body);
    res.json(fuerza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar fuerza muscular' });
  }
};

// DELETE
exports.eliminarFuerzaMuscular = async (req, res) => {
  try {
    const { id } = req.params;
    const fuerza = await FuerzaMuscular.findByPk(id);
    if (!fuerza) {
      return res.status(404).json({ mensaje: 'Fuerza muscular no encontrada' });
    }

    await fuerza.destroy();
    res.json({ mensaje: 'Fuerza muscular eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar fuerza muscular' });
  }
};
