/* eslint-disable no-console */

const Users = require("../models/users");
const Tools = require("../models/tools");

const migrate = async () => {
  await Users.sync({ alter: true });
  await Tools.sync({ alter: true });
};

migrate().then(
  () => console.log("Ok"),
).catch((error) => console.log(`The migration was failed: ${error}`)).finally(
  () => process.exit(0),
);
