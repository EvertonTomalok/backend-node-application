const { Sequelize } = require("sequelize");

require("dotenv").config();

const LOGGING = process.env.LOGGING !== "false";
const DATABASE = process.env.TESTING === "true" ? "postgres" : "bossa_box_backend";
const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || 5432;
const PASS = process.env.DB_PW || "hZmc8cQBTZM";
const USER = process.env.DB_USER || "postgres";

const sequelize = new Sequelize(
  `postgres://${USER}:${PASS}@${HOST}:${PORT}/${DATABASE}`,
  { logging: LOGGING },
);

module.exports = sequelize;
