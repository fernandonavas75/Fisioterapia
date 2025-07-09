require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: {
        require: true, // This will ensure SSL is used
        rejectUnauthorized: false, // This is important for self-signed certificates
      },
    },
    logging: false,
  }
);

module.exports = sequelize;
// This code initializes a Sequelize instance for connecting to a PostgreSQL database using environment variables for configuration.
// It uses dotenv to load environment variables from a .env file, allowing for secure and flexible configuration.
// The Sequelize instance is exported for use in other parts of the application, such as models and migrations.
// Ensure that the .env file contains the necessary variables: DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, and DB_PORT.
