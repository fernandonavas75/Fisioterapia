const EvaluacionPostural = require('../models/EvaluacionPostural');

exports.obtenerTodas = async () => {
  return await EvaluacionPostural.findAll();
};

exports.crear = async (data) => {
  return await EvaluacionPostural.create(data);
};

exports.actualizar = async (id, data) => {
  const registro = await EvaluacionPostural.findByPk(id);
  if (!registro) throw new Error('No encontrado');
  return await registro.update(data);
};

exports.eliminar = async (id) => {
  const registro = await EvaluacionPostural.findByPk(id);
  if (!registro) throw new Error('No encontrado');
  return await registro.destroy();
};
