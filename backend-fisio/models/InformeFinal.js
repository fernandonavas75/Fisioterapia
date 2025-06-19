const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HistoriaClinica = require('./HistoriaClinica');

const InformeFinal = sequelize.define('InformeFinal', {
  id_informe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_historia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'HistoriaClinica',
      key: 'id_historia'
    }
  },
  lugar_atencion: DataTypes.STRING(100),
  resumen_clinico: DataTypes.TEXT,
  recomendaciones: DataTypes.TEXT,
  evaluador_nombre: DataTypes.STRING(100),
  fecha_informe: DataTypes.DATE
}, {
  tableName: 'InformeFinal',
  timestamps: false
});

InformeFinal.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });

module.exports = InformeFinal;
