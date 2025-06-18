const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_completo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  rol: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  contrasena: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'Usuario',
  timestamps: false
});

const HistoriaClinica = require('./HistoriaClinica');
Usuario.hasMany(HistoriaClinica, { foreignKey: 'id_estudiante' });

module.exports = Usuario;
