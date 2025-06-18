const FirmasConsentimientos = require('../models/FirmasConsentimientos');

exports.obtenerTodas = async () => {
  return await FirmasConsentimientos.findAll();
};

exports.crear = async (data) => {
  return await FirmasConsentimientos.create(data);
};

exports.actualizar = async (id, data) => {
  const registro = await FirmasConsentimientos.findByPk(id);
  if (!registro) throw new Error('No encontrado');
  return await registro.update(data);
};

exports.eliminar = async (id) => {
  const registro = await FirmasConsentimientos.findByPk(id);
  if (!registro) throw new Error('No encontrado');
  return await registro.destroy();
};
