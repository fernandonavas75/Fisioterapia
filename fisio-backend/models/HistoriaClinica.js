const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  peso: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  estatura: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  escuela: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  grado: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  nombres_tutor: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  apellidos_tutor: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  telefono_tutor: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  correo_tutor: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  id_sector: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Sector',
      key: 'id_sector'
    }
  },
  fecha_evaluacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivo_consulta: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  inicio_sintomas: {
    type: DataTypes.STRING(450),
    allowNull: true
  },
  descripcion_sintomas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  factores_agran_o_alivian: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tratamientos_previos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  diagnostico_preliminar: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  objetivos: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ejercicios_fortalecimiento: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ejercicios_estiramiento: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reeducacion_postural: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  otras_tecnicas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  uso_calzado_adecuado: {
    type: DataTypes.STRING(4),
    allowNull: true
  },
  especificar_calzado: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  actividades_fisicas: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  restricciones_precauciones: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'HistoriaClinica',
  timestamps: false
});


module.exports = HistoriaClinica;
// This code defines a Sequelize model for a clinical history in a healthcare application.
// The model includes various fields such as patient ID, student ID, age, weight, height,
// school, grade, tutor information, sector ID, evaluation date, and various medical details.
// It establishes relationships with other models like Paciente and Usuario through foreign keys.
// The model is configured to not use timestamps and specifies the table name as 'HistoriaClinica'.
// The model is then exported for use in other parts of the application, allowing for CRUD operations
// and interactions with the clinical history data in the database.
// The model is designed to handle various aspects of a patient's clinical history, including personal details,
// medical evaluations, treatment plans, and other relevant information.

// This code is part of a Node.js application using Sequelize ORM to manage a PostgreSQL database.
// It defines a model for a clinical history (`HistoriaClinica`) with various fields related to
// patient information, medical evaluations, and treatment plans.
// The model includes relationships with other models like `Paciente` and `Usuario` through foreign keys
// and is configured to not use timestamps.
// The model is exported for use in other parts of the application, allowing for CRUD operations
// and interactions with the clinical history data in the database.
// The model is designed to handle various aspects of a patient's clinical history, including personal details,
// medical evaluations, treatment plans, and other relevant information.
// This code is part of a Node.js application using Sequelize ORM to manage a PostgreSQL database.
// It defines a model for a clinical history (`HistoriaClinica`) with various fields related to
// patient information, medical evaluations, and treatment plans.
// The model includes relationships with other models like `Paciente` and `Usuario` through foreign keys
// and is configured to not use timestamps.
// The model is exported for use in other parts of the application, allowing for CRUD operations
// and interactions with the clinical history data in the database.
// The model is designed to handle various aspects of a patient's clinical history, including personal details,
// medical evaluations, treatment plans, and other relevant information.
// This code is part of a Node.js application using Sequelize ORM to manage a PostgreSQL database
// It defines a model for a clinical history (`HistoriaClinica`) with various fields related to
// patient information, medical evaluations, and treatment plans.
// The model includes relationships with other models like `Paciente` and `Usuario` through foreign keys
// and is configured to not use timestamps.
// 