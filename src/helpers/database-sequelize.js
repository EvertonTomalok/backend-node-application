const { Sequelize } = require("sequelize");

require("dotenv").config();

const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || 5432;
const PASS = process.env.DB_PW;
const USER = process.env.DB_USER;
const DATABASE = process.env.DB_NAME;

const sequelize = new Sequelize(
  `postgres://${USER}:${PASS}@${HOST}:${PORT}/${DATABASE}`,
);

module.exports = sequelize;
