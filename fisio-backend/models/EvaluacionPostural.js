const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EvaluacionPostural = sequelize.define('EvaluacionPostural', {
  id_historia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'HistoriaClinica',
      key: 'id_historia'
    }
  },
  cabeza_cuello: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  hombros: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  columna: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  pelvis: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  extremidades_inferiores: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  arco_plantar: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  puntos_dolorosos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  eva_dolor: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 10
    }
  },
  tejidos_blandos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estructuras_oseas: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'EvaluacionPostural',
  timestamps: false
});

module.exports = EvaluacionPostural;
