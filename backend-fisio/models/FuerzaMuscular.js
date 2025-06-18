const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const HistoriaClinica = require('./HistoriaClinica');

const FuerzaMuscular = sequelize.define('FuerzaMuscular', {
  id_fuerza: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_historia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'HistoriaClinica',
      key: 'id_historia'
    }
  },
  zona_anatomica: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  musculo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  grado: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    }
  }
}, {
  tableName: 'FuerzaMuscular',
  timestamps: false
});

FuerzaMuscular.belongsTo(HistoriaClinica, { foreignKey: 'id_historia' });
HistoriaClinica.hasMany(FuerzaMuscular, { foreignKey: 'id_historia' });

module.exports = FuerzaMuscular;
