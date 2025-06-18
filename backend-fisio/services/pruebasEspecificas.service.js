const PruebasEspecificas = require('../models/PruebasEspecificas');

exports.obtenerTodas = async () => {
  return await PruebasEspecificas.findAll();
};

exports.crear = async (data) => {
  return await PruebasEspecificas.create(data);
};

exports.actualizar = async (id, data) => {
  const registro = await PruebasEspecificas.findByPk(id);
  if (!registro) throw new Error('No encontrado');
  return await registro.update(data);
};

exports.eliminar = async (id) => {
  const registro = await PruebasEspecificas.findByPk(id);
  if (!registro) throw new Error('No encontrado');
  return await registro.destroy();
};
