/* eslint-disable no-unused-vars */

const Users = require("../models/users");

function getUserByEmail(email) {}

async function createUser(email, nome, hash) {
  const user = Users.build(
    { email, nome, senha: hash },
  );

  const result = await user.save();
  return result;
}

module.exports = { getUserByEmail, createUser };
