const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EvaluacionFuncional = sequelize.define('EvaluacionFuncional', {
  id_historia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'HistoriaClinica',
      key: 'id_historia'
    }
  },
  marcha_estado: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  marcha_descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  equilibrio_estado: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  rango_movimiento_estado: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  rango_movimiento_areas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fuerza_muscular_estado: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  fuerza_muscular_areas: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'EvaluacionFuncional',
  timestamps: false
});

module.exports = EvaluacionFuncional;
