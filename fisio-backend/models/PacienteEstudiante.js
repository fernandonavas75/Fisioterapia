const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PacienteEstudiante = sequelize.define('PacienteEstudiante', {
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
  id_estudiante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario',
      key: 'id_usuario'
    }
  },
  fecha_asignacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'PacienteEstudiante',
  timestamps: false
});

module.exports = PacienteEstudiante;
