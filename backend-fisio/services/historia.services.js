const HistoriaClinica = require('../models/HistoriaClinica');
const Paciente = require('../models/Paciente');
const Usuario = require('../models/Usuario');

exports.obtenerTodas = async () => {
  return await HistoriaClinica.findAll({
    include: [
      { model: Paciente },
      { model: Usuario }
    ]
  });
};

exports.crear = async (data) => {
  return await HistoriaClinica.create(data);
};

exports.actualizar = async (id, data) => {
  const historia = await HistoriaClinica.findByPk(id);
  if (!historia) throw new Error('Historia no encontrada');
  return await historia.update(data);
};

exports.eliminar = async (id) => {
  const historia = await HistoriaClinica.findByPk(id);
  if (!historia) throw new Error('Historia no encontrada');
  return await historia.destroy();
};
