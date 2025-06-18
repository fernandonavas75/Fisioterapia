const FuerzaMuscular = require('../models/FuerzaMuscular');

exports.obtenerTodos = async () => {
  return await FuerzaMuscular.findAll();
};

exports.crear = async (data) => {
  return await FuerzaMuscular.create(data);
};

exports.actualizar = async (id, data) => {
  const item = await FuerzaMuscular.findByPk(id);
  if (!item) throw new Error('No encontrado');
  return await item.update(data);
};

exports.eliminar = async (id) => {
  const item = await FuerzaMuscular.findByPk(id);
  if (!item) throw new Error('No encontrado');
  return await item.destroy();
};
