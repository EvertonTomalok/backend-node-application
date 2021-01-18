const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const UsersDB = require("../repositories/users");
const Password = require("../utils/password");

require("dotenv").config();

async function authentication(ctx) {
  const { email = null, senha = null } = ctx.request.body;

  if (email === null || senha === null) {
    return response(ctx, 400, { mensagem: "Bad Request" });
  }

  const user = await UsersDB.getUserByEmail(email);
  if (user) {
    const comparison = await Password.check(senha, user.senha);
    if (comparison) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
      );
      return response(ctx, 200, { token: `Bearer ${token}` });
    }
  }
  return response(ctx, 400, { msg: "Email or password is incorrect." });
}

module.exports = { authentication };
