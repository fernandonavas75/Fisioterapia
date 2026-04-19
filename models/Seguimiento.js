const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
  id_estudiante: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Usuario',
      key: 'id_usuario'
    }
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  intervenciones: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Seguimiento',
  timestamps: false
});

module.exports = Seguimiento;
