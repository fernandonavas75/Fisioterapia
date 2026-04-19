const PruebasEspecificas = require('../models/PruebasEspecificas');

// CREATE
exports.crearPruebasEspecificas = async (req, res) => {
  try {
    const pruebas = await PruebasEspecificas.create(req.body);
    res.status(201).json(pruebas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear pruebas específicas' });
  }
};

// READ ALL
exports.obtenerPruebasEspecificas = async (req, res) => {
  try {
    const pruebas = await PruebasEspecificas.findAll();
    res.json(pruebas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener pruebas específicas' });
  }
};

// READ ONE
exports.obtenerPruebasEspecificasPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pruebas = await PruebasEspecificas.findByPk(id);
    if (!pruebas) {
      return res.status(404).json({ mensaje: 'Pruebas específicas no encontradas' });
    }
    res.json(pruebas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener pruebas específicas' });
  }
};

// UPDATE
exports.actualizarPruebasEspecificas = async (req, res) => {
  try {
    const { id } = req.params;
    const pruebas = await PruebasEspecificas.findByPk(id);
    if (!pruebas) {
      return res.status(404).json({ mensaje: 'Pruebas específicas no encontradas' });
    }

    await pruebas.update(req.body);
    res.json(pruebas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar pruebas específicas' });
  }
};

// DELETE
exports.eliminarPruebasEspecificas = async (req, res) => {
  try {
    const { id } = req.params;
    const pruebas = await PruebasEspecificas.findByPk(id);
    if (!pruebas) {
      return res.status(404).json({ mensaje: 'Pruebas específicas no encontradas' });
    }

    await pruebas.destroy();
    res.json({ mensaje: 'Pruebas específicas eliminadas exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar pruebas específicas' });
  }
};
