const FirmasConsentimientos = require('../models/FirmasConsentimientos');

// CREATE
exports.crearFirmasConsentimientos = async (req, res) => {
  try {
    const firmas = await FirmasConsentimientos.create(req.body);
    res.status(201).json(firmas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear firmas y consentimientos' });
  }
};

// READ ALL
exports.obtenerFirmasConsentimientos = async (req, res) => {
  try {
    const firmas = await FirmasConsentimientos.findAll();
    res.json(firmas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener firmas y consentimientos' });
  }
};

// READ ONE
exports.obtenerFirmasConsentimientosPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const firmas = await FirmasConsentimientos.findByPk(id);
    if (!firmas) {
      return res.status(404).json({ mensaje: 'Firmas y consentimientos no encontrados' });
    }
    res.json(firmas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener firmas y consentimientos' });
  }
};

// UPDATE
exports.actualizarFirmasConsentimientos = async (req, res) => {
  try {
    const { id } = req.params;
    const firmas = await FirmasConsentimientos.findByPk(id);
    if (!firmas) {
      return res.status(404).json({ mensaje: 'Firmas y consentimientos no encontrados' });
    }

    await firmas.update(req.body);
    res.json(firmas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar firmas y consentimientos' });
  }
};

// DELETE
exports.eliminarFirmasConsentimientos = async (req, res) => {
  try {
    const { id } = req.params;
    const firmas = await FirmasConsentimientos.findByPk(id);
    if (!firmas) {
      return res.status(404).json({ mensaje: 'Firmas y consentimientos no encontrados' });
    }

    await firmas.destroy();
    res.json({ mensaje: 'Firmas y consentimientos eliminados exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar firmas y consentimientos' });
  }
};
