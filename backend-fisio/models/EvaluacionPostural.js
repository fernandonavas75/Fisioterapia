const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HistoriaClinica = require('./HistoriaClinica');

const EvaluacionPostural = sequelize.define('EvaluacionPostural', {
  id_historia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'HistoriaClinica',
      key: 'id_historia'
    }
  },
  cabeza_cuello: DataTypes.TEXT,
  hombros: DataTypes.TEXT,
  columna: DataTypes.TEXT,
  pelvis: DataTypes.TEXT,
  extremidades: DataTypes.TEXT,
  arco_plantar: DataTypes.TEXT
}, {
  tableName: 'EvaluacionPostural',
  timestamps: false
});

EvaluacionPostural.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });
HistoriaClinica.hasOne(EvaluacionPostural, { foreignKey: 'id_historia' });

module.exports = EvaluacionPostural;
