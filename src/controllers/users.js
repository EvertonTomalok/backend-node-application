const response = require("../utils/response");
const UsersDB = require("../repositories/users");

async function createUser(ctx) {
  const {
    email = null,
    nome = null,
  } = ctx.request.body;
  const { hash } = ctx.state;

  if (!email || !nome || !hash) {
    return response(ctx, 400, { message: "BAD REQUEST." });
  }

  const exists = await UsersDB.getUserByEmail(email);

  if (exists) {
    return response(ctx, 400, { message: "User already exists!" });
  }

  const newUser = await UsersDB.createUser(email, nome, hash);
  if (newUser) {
    return response(ctx, 200, { id: newUser.id });
  }
  return response(ctx, 400, { message: "Something went wrong." });
}

module.exports = { createUser };
