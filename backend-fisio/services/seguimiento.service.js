const Seguimiento = require('../models/Seguimiento');

exports.obtenerTodos = async () => {
  return await Seguimiento.findAll();
};

exports.crear = async (data) => {
  return await Seguimiento.create(data);
};

exports.actualizar = async (id, data) => {
  const registro = await Seguimiento.findByPk(id);
  if (!registro) throw new Error('No encontrado');
  return await registro.update(data);
};

exports.eliminar = async (id) => {
  const registro = await Seguimiento.findByPk(id);
  if (!registro) throw new Error('No encontrado');
  return await registro.destroy();
};
