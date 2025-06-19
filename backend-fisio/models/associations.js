// Importa todos los modelos
const Usuario = require('./Usuario');
const Paciente = require('./Paciente');
const HistoriaClinica = require('./HistoriaClinica');
const Antecedentes = require('./Antecedentes');
const EvaluacionPostural = require('./EvaluacionPostural');
const FuerzaMuscular = require('./FuerzaMuscular');
const PruebasEspecificas = require('./PruebasEspecificas');
const Seguimiento = require('./Seguimiento');
const InformeFinal = require('./InformeFinal');
const FirmasConsentimientos = require('./FirmasConsentimientos');

// Relaciones

// Historia Clínica
HistoriaClinica.belongsTo(Paciente, { foreignKey: 'id_paciente' });
Paciente.hasMany(HistoriaClinica, { foreignKey: 'id_paciente' });

HistoriaClinica.belongsTo(Usuario, { foreignKey: 'id_estudiante' });
Usuario.hasMany(HistoriaClinica, { foreignKey: 'id_estudiante' });

// Historia -> 1:1 relaciones
HistoriaClinica.hasOne(Antecedentes, { foreignKey: 'id_historia' });
Antecedentes.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });

HistoriaClinica.hasOne(EvaluacionPostural, { foreignKey: 'id_historia' });
EvaluacionPostural.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });

HistoriaClinica.hasOne(PruebasEspecificas, { foreignKey: 'id_historia' });
PruebasEspecificas.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });

HistoriaClinica.hasOne(InformeFinal, { foreignKey: 'id_historia' });
InformeFinal.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });

HistoriaClinica.hasOne(FirmasConsentimientos, { foreignKey: 'id_historia' });
FirmasConsentimientos.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });

// Historia -> 1:N relaciones
HistoriaClinica.hasMany(FuerzaMuscular, { foreignKey: 'id_historia' });
FuerzaMuscular.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });

HistoriaClinica.hasMany(Seguimiento, { foreignKey: 'id_historia' });
Seguimiento.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });

module.exports = {
  Usuario,
  Paciente,
  HistoriaClinica,
  Antecedentes,
  EvaluacionPostural,
  FuerzaMuscular,
  PruebasEspecificas,
  Seguimiento,
  InformeFinal,
  FirmasConsentimientos
};
