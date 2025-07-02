const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombres: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  cedula: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  rol: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  conexion: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'Usuario',
  timestamps: false,
});

module.exports = Usuario;
// This code defines a Sequelize model for a "Usuario" (User) entity in a PostgreSQL database.
// It specifies the structure of the "Usuario" table, including fields like `id_usuario`,   
// `nombres`, `apellidos`, `cedula`, `correo`, `rol`, `contrasena`, and `conexion`.
// Each field has its data type and constraints, such as primary key, auto-increment,  
// uniqueness, and nullability.\
// The model is exported for use in other parts of the application, such as controllers and routes.
// Ensure that the database connection is properly configured in the `config/database.js` file.    
