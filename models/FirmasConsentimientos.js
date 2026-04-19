const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FirmasConsentimientos = sequelize.define('FirmasConsentimientos', {
  id_historia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'HistoriaClinica',
      key: 'id_historia'
    }
  },
  nombre_evaluador: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  firma_evaluador: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  nombre_tutor: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  firma_tutor: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'FirmasConsentimientos',
  timestamps: false
});

module.exports = FirmasConsentimientos;
