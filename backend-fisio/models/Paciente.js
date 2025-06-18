const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Paciente = sequelize.define('Paciente', {
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombres: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  peso: {
    type: DataTypes.DECIMAL(5, 2)
  },
  estatura: {
    type: DataTypes.DECIMAL(5, 2)
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  escuela: {
    type: DataTypes.STRING(100)
  },
  grado: {
    type: DataTypes.STRING(50)
  },
  nombre_tutor: {
    type: DataTypes.STRING(100)
  },
  telefono_tutor: {
    type: DataTypes.STRING(20)
  },
  correo_tutor: {
    type: DataTypes.STRING(100)
  }
}, {
  tableName: 'Paciente',
  timestamps: false
});

const HistoriaClinica = require('./HistoriaClinica');
Paciente.hasMany(HistoriaClinica, { foreignKey: 'id_paciente' });

module.exports = Paciente;