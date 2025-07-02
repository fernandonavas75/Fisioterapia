const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PacienteSector = sequelize.define('PacienteSector', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Paciente',
      key: 'id_paciente'
    }
  },
  id_sector: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Sector',
      key: 'id_sector'
    }
  },
  fecha_asignacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'PacienteSector',
  timestamps: false
});

module.exports = PacienteSector;
