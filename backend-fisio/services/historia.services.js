const HistoriaClinica = require('../models/HistoriaClinica');
const Paciente = require('../models/Paciente');
const Usuario = require('../models/Usuario');

exports.obtenerTodas = async () => {
  return await HistoriaClinica.findAll({
    include: [
      {
        model: Paciente,
        as: 'paciente',
        attributes: ['nombres', 'apellidos', 'escuela', 'grado']
      },
      {
        model: Usuario,
        as: 'estudiante',
        attributes: ['nombre_completo']
      }
    ],
    order: [['fecha_evaluacion', 'DESC']]
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

exports.obtenerUna = async (id) => {
  return await HistoriaClinica.findByPk(id, {
    include: [
      { model: Paciente, as: 'paciente' },
      { model: Usuario, as: 'estudiante' }
    ]
  });
};
