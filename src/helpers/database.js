const { Sequelize } = require("sequelize");

require("dotenv").config();

if (process.env.TESTING === "false") {
  const HOST = process.env.DB_HOST || "localhost";
  const PORT = process.env.DB_PORT || 5432;
  const PASS = process.env.DB_PW ;
  const USER = process.env.DB_USER;
  const DATABASE = process.env.DB_NAME;
} else {
  const HOST = "localhost";
  const PORT = 5432;
  const PASS = "my_user";
  const USER = "my_pass";
  const DATABASE = "tests";
}

const sequelize = new Sequelize(
  `postgres://${USER}:${PASS}@${HOST}:${PORT}/${DATABASE}`,
);

module.exports = sequelize;
