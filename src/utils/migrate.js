/* eslint-disable no-console */

const Users = require('../models/user');
const Tools = require('../models/tool');

const migrate = async () => {
  await Users.sync();
  await Tools.sync();
};

migrate().then(
  () => console.log("Ok"),
).catch((error) => console.log(`The migration was failed: ${error}`)).finally(
  () => process.exit(0),
);
