const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Antecedentes = sequelize.define('Antecedentes', {
  id_historia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'HistoriaClinica',
      key: 'id_historia'
    }
  },
  enfermedades_importantes: DataTypes.TEXT,
  cirugias_previas: DataTypes.TEXT,
  hospitalizaciones: DataTypes.TEXT,
  alergias: DataTypes.TEXT,
  medicamentos_actuales: DataTypes.TEXT,
  vacunacion_completa: DataTypes.BOOLEAN,
  enf_musculoesqueleticas_familia: DataTypes.TEXT,
  condiciones_hereditarias: DataTypes.TEXT
}, {
  tableName: 'Antecedentes',
  timestamps: false
});

module.exports = Antecedentes;
