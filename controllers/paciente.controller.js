const e = require('express');
const Paciente = require('../models/Paciente');
const { Op } = require('sequelize');

// CREATE  
exports.crearPaciente = async (req, res) => {
  try {
    const { nombres, apellidos, genero, fecha_nacimiento } = req.body;

    const nuevoPaciente = await Paciente.create({
      nombres,
      apellidos,
      genero,
      fecha_nacimiento
    });

    res.status(201).json(nuevoPaciente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear paciente' });
  }
}
// READ ALL
exports.obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener pacientes' });
  }
}

// READ ONE
exports.obtenerPacientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }
    res.json(paciente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener paciente' });
  }
}

//Buscar paciente por nombre o apellidos
exports.obtenerPacientePorNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const pacientes = await Paciente.findAll({
      where: {
        [Op.or]: [
          { nombres: { [Op.iLike]: `%${nombre}%` } },
          { apellidos: { [Op.iLike]: `%${nombre}%` } }
        ]
      }
    });
    if (pacientes.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron pacientes con ese nombre' });
    }
    res.json(pacientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al buscar paciente por nombre' });
  }
}

//update
exports.actualizarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, genero, fecha_nacimiento } = req.body;

    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    paciente.nombres = nombres;
    paciente.apellidos = apellidos;
    paciente.genero = genero;
    paciente.fecha_nacimiento = fecha_nacimiento;

    await paciente.save();
    res.json(paciente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar paciente' });
  }
}

//delete
exports.eliminarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    }

    await paciente.destroy();
    res.json({ mensaje: 'Paciente eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar paciente' });
  }
}
