const Paciente = require('../models/Paciente');

exports.obtenerTodos = async () => {
  return await Paciente.findAll();
};

exports.crear = async (data) => {
  return await Paciente.create(data);
  //hacer
};

exports.actualizar = async (id, data) => {
  const paciente = await Paciente.findByPk(id);
  if (!paciente) throw new Error('Paciente no encontrado');
  return await paciente.update(data);
};

exports.eliminar = async (id) => {
  const paciente = await Paciente.findByPk(id);
  if (!paciente) throw new Error('Paciente no encontrado');
  return await paciente.destroy();
};
