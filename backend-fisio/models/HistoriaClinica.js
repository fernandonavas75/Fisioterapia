const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Paciente = require('./Paciente');
const Usuario = require('./Usuario');

const HistoriaClinica = sequelize.define('HistoriaClinica', {
  id_historia: {
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
  fecha_evaluacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivo_consulta: {
    type: DataTypes.TEXT
  },
  historia_condicion_actual: {
    type: DataTypes.TEXT
  },
  diagnostico_preliminar: {
    type: DataTypes.TEXT
  },
  plan_intervencion: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'HistoriaClinica',
  timestamps: false
});

// Relaciones
HistoriaClinica.belongsTo(Paciente, { foreignKey: 'id_paciente' });
HistoriaClinica.belongsTo(Usuario, { foreignKey: 'id_estudiante' });

module.exports = HistoriaClinica;
