const InformeFinal = require('../models/InformeFinal');

exports.obtenerTodos = async () => {
  return await InformeFinal.findAll();
};

exports.crear = async (data) => {
  return await InformeFinal.create(data);
};

exports.actualizar = async (id, data) => {
  const registro = await InformeFinal.findByPk(id);
  if (!registro) throw new Error('No encontrado');
  return await registro.update(data);
};

exports.eliminar = async (id) => {
  const registro = await InformeFinal.findByPk(id);
  if (!registro) throw new Error('No encontrado');
  return await registro.destroy();
};
