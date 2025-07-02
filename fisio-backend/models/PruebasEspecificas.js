const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PruebasEspecificas = sequelize.define('PruebasEspecificas', {
  id_historia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'HistoriaClinica',
      key: 'id_historia'
    }
  },
  adams_test: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  jack_test: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  otras_pruebas: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'PruebasEspecificas',
  timestamps: false
});

module.exports = PruebasEspecificas;
