const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HistoriaClinica = require('./HistoriaClinica');

const FirmasConsentimientos = sequelize.define('FirmasConsentimientos', {
  id_historia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'HistoriaClinica',
      key: 'id_historia'
    }
  },
  nombre_evaluador: DataTypes.STRING(100),
  firma_evaluador: DataTypes.TEXT,
  nombre_tutor: DataTypes.STRING(100),
  firma_tutor: DataTypes.TEXT,
  fecha_firma: DataTypes.DATE
}, {
  tableName: 'FirmasConsentimientos',
  timestamps: false
});

FirmasConsentimientos.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });
HistoriaClinica.hasOne(FirmasConsentimientos, { foreignKey: 'id_historia' });

module.exports = FirmasConsentimientos;
