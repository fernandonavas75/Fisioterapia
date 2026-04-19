const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Paciente = sequelize.define('Paciente', {
    id_paciente: {
        type: DataTypes.INTEGER,  
        primaryKey: true,
        autoIncrement: true
    },
    nombres: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'Paciente',
        timestamps: false,
        indexes: [] //pueden tener familiares los pacientes, por lo que no se recomienda crear un índice único
    });

    module.exports = Paciente;