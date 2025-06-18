const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HistoriaClinica = require('./HistoriaClinica');

const PruebasEspecificas = sequelize.define('PruebasEspecificas', {
  id_historia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'HistoriaClinica',
      key: 'id_historia'
    }
  },
  adams_test: DataTypes.BOOLEAN,
  jack_test: DataTypes.BOOLEAN,
  otras_pruebas: DataTypes.TEXT
}, {
  tableName: 'PruebasEspecificas',
  timestamps: false
});

PruebasEspecificas.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });
HistoriaClinica.hasOne(PruebasEspecificas, { foreignKey: 'id_historia' });

module.exports = PruebasEspecificas;
