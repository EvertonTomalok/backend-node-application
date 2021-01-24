const Users = require("../models/users");

const getUserByEmail = async (email) => {
  const result = await Users.findOne({
    where: {
      email,
    },
  });
  return result;
};

const createUser = async (email, nome, hash) => {
  const result = await Users.create({ email, nome, senha: hash });
  return result;
};

module.exports = { getUserByEmail, createUser };
