const Antecedentes = require('../models/Antecedentes');

exports.obtenerTodos = async () => {
  return await Antecedentes.findAll();
};

exports.crear = async (data) => {
  return await Antecedentes.create(data);
};

exports.actualizar = async (id_historia, data) => {
  const registro = await Antecedentes.findByPk(id_historia);
  if (!registro) throw new Error('No encontrado');
  return await registro.update(data);
};

exports.eliminar = async (id_historia) => {
  const registro = await Antecedentes.findByPk(id_historia);
  if (!registro) throw new Error('No encontrado');
  return await registro.destroy();
};
