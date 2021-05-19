const { Sequelize } = require("sequelize");

require("dotenv").config();

const DATABASE = process.env.TESTING === "true" ? "postgres" : "backend";
const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || 5432;
const PASS = process.env.DB_PW || "my_pass";
const USER = process.env.DB_USER || "my_user";

const sequelize = new Sequelize({
  database: DATABASE,
  username: USER,
  password: PASS,
  host: HOST,
  port: PORT,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
