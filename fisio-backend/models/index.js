const Usuario = require('./Usuario');
const Paciente = require('./Paciente');
const HistoriaClinica = require('./HistoriaClinica');
const Sector = require('./Sector');

const Antecedentes = require('./Antecedentes');
const EvaluacionPostural = require('./EvaluacionPostural');
const EvaluacionFuncional = require('./EvaluacionFuncional');
const FuerzaMuscular = require('./FuerzaMuscular');
const InformeFinal = require('./InformeFinal');
const Seguimiento = require('./Seguimiento');
const FirmasConsentimientos = require('./FirmasConsentimientos');

// RELACIONES

// HistoriaClinica pertenece a Paciente
HistoriaClinica.belongsTo(Paciente, {
  foreignKey: 'id_paciente',
  as: 'paciente'
});
Paciente.hasMany(HistoriaClinica, {
  foreignKey: 'id_paciente',
  as: 'historiasClinicas'
});

// HistoriaClinica pertenece a Usuario (Estudiante)
HistoriaClinica.belongsTo(Usuario, {
  foreignKey: 'id_estudiante',
  as: 'estudiante'
});
Usuario.hasMany(HistoriaClinica, {
  foreignKey: 'id_estudiante',
  as: 'historiasClinicas'
});

// HistoriaClinica pertenece a Sector
HistoriaClinica.belongsTo(Sector, {
  foreignKey: 'id_sector',
  as: 'sector'
});
Sector.hasMany(HistoriaClinica, {
  foreignKey: 'id_sector',
  as: 'historiasClinicas'
});

module.exports = {
  Usuario,
  Paciente,
  HistoriaClinica,
  Sector,
  Antecedentes,
  EvaluacionPostural,
  EvaluacionFuncional,
  FuerzaMuscular,
  InformeFinal,
  Seguimiento,
  FirmasConsentimientos
};
