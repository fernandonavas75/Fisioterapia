const InformeFinal = require('../models/InformeFinal');

// CREATE
exports.crearInformeFinal = async (req, res) => {
  try {
    const informe = await InformeFinal.create(req.body);
    res.status(201).json(informe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear informe' });
  }
};

// READ ALL
exports.obtenerInformesFinales = async (req, res) => {
  try {
    const informes = await InformeFinal.findAll();
    res.json(informes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener informes' });
  }
};

// READ ONE
exports.obtenerInformeFinalPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const informe = await InformeFinal.findByPk(id);
    if (!informe) {
      return res.status(404).json({ mensaje: 'Informe no encontrado' });
    }
    res.json(informe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener informe' });
  }
};

// UPDATE
exports.actualizarInformeFinal = async (req, res) => {
  try {
    const { id } = req.params;
    const informe = await InformeFinal.findByPk(id);
    if (!informe) {
      return res.status(404).json({ mensaje: 'Informe no encontrado' });
    }

    await informe.update(req.body);
    res.json(informe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar informe' });
  }
};

// DELETE
exports.eliminarInformeFinal = async (req, res) => {
  try {
    const { id } = req.params;
    const informe = await InformeFinal.findByPk(id);
    if (!informe) {
      return res.status(404).json({ mensaje: 'Informe no encontrado' });
    }

    await informe.destroy();
    res.json({ mensaje: 'Informe eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar informe' });
  }
};
