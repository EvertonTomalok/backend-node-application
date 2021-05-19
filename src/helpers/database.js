const { Sequelize } = require("sequelize");

require("dotenv").config();

const LOGGING = process.env.LOGGING !== "false";
const DATABASE = process.env.TESTING === "true" ? "postgres" : "backend";
const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || 5432;
const PASS = process.env.DB_PW || "my_pass";
const USER = process.env.DB_USER || "my_user";

const sequelize = new Sequelize(
  `postgres://${USER}:${PASS}@${HOST}:${PORT}/${DATABASE}?ssl=${HOST !== "localhost"}`,
  { logging: LOGGING },
);

module.exports = sequelize;
