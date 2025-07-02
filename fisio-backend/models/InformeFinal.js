const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InformeFinal = sequelize.define('InformeFinal', {
  id_informe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  tipo_informe: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario',
      key: 'id_usuario'
    }
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  enlace_pdf: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'InformeFinal',
  timestamps: false
});

module.exports = InformeFinal;
