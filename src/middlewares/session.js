/* eslint-disable no-unused-vars */

const jwt = require("jsonwebtoken");
const response = require("../utils/response");

require("dotenv").config();

async function verify(ctx, next) {
  try {
    const [bearer, token] = ctx.headers.authorization.split(" ");
    const verification = await jwt.verify(token, process.env.JWT_SECRET);

    ctx.state.userId = verification.id;
    ctx.state.email = verification.email;
  } catch (err) {
    return response(ctx, 403, "Forbidden");
  }

  return next();
}

module.exports = { verify };
