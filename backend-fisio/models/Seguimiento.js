const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HistoriaClinica = require('./HistoriaClinica');

const Seguimiento = sequelize.define('Seguimiento', {
  id_seguimiento: {
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
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  intervenciones: DataTypes.TEXT,
  observaciones: DataTypes.TEXT
}, {
  tableName: 'Seguimiento',
  timestamps: false
});

Seguimiento.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });
HistoriaClinica.hasMany(Seguimiento, { foreignKey: 'id_historia' });

module.exports = Seguimiento;
