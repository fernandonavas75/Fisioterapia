const Usuario = require('../models/Usuario');

exports.obtenerTodos = async () => {
  return await Usuario.findAll();
};

exports.crear = async (data) => {
  return await Usuario.create(data);
};

exports.actualizar = async (id, data) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error('Usuario no encontrado');
  return await usuario.update(data);
};

exports.eliminar = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) throw new Error('Usuario no encontrado');
  return await usuario.destroy();
};
