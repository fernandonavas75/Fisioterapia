const Sector = require('../models/Sector');
const { Op } = require('sequelize');

// CREATE
exports.crearSector = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const sector = await Sector.create({ nombre, descripcion });
    console.log('Sector creado correctamente:', sector.id_sector);
    res.status(201).json(sector);
  } catch (error) {
    console.error('Error al crear sector:', error);
    res.status(500).json({ error: 'Error al crear sector' });
  }
};

// READ ALL
exports.obtenerSectores = async (req, res) => {
  try {
    const sectores = await Sector.findAll();
    console.log(`Se encontraron ${sectores.length} sectores.`);
    res.json(sectores);
  } catch (error) {
    console.error('Error al obtener sectores:', error);
    res.status(500).json({ error: 'Error al obtener sectores' });
  }
};

// READ ONE
exports.obtenerSectorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const sector = await Sector.findByPk(id);
    if (!sector) {
      console.warn('Sector no encontrado con ID:', id);
      return res.status(404).json({ error: 'Sector no encontrado' });
    }
    res.json(sector);
  } catch (error) {
    console.error('Error al obtener sector:', error);
    res.status(500).json({ error: 'Error al obtener sector' });
  }
};

// UPDATE
exports.actualizarSector = async (req, res) => {
  try {
    const { id } = req.params;
    const sector = await Sector.findByPk(id);
    if (!sector) {
      console.warn('Sector no encontrado con ID:', id);
      return res.status(404).json({ error: 'Sector no encontrado' });
    }

    await sector.update(req.body);
    console.log('Sector actualizado:', sector.id_sector);
    res.json(sector);
  } catch (error) {
    console.error('Error al actualizar sector:', error);
    res.status(500).json({ error: 'Error al actualizar sector' });
  }
};

// DELETE
exports.eliminarSector = async (req, res) => {
  try {
    const { id } = req.params;
    const sector = await Sector.findByPk(id);
    if (!sector) {
      console.warn('Sector no encontrado con ID:', id);
      return res.status(404).json({ error: 'Sector no encontrado' });
    }

    await sector.destroy();
    console.log('Sector eliminado:', sector.id_sector);
    res.json({ mensaje: 'Sector eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar sector:', error);
    res.status(500).json({ error: 'Error al eliminar sector' });
  }
};

// BUSCAR POR NOMBRE
exports.buscarSectorPorNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const sectores = await Sector.findAll({
      where: {
        nombre: { [Op.iLike]: `%${nombre}%` }
      }
    });
    if (sectores.length === 0) {
      console.warn('No se encontraron sectores con el nombre:', nombre);
      return res.status(404).json({ error: 'No se encontraron sectores con ese nombre' });
    }
    res.json(sectores);
  } catch (error) {
    console.error('Error al buscar sectores por nombre:', error);
    res.status(500).json({ error: 'Error al buscar sectores por nombre' });
  }
};
