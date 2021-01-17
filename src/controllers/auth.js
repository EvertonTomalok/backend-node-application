const response = require("../utils/response");
const UsersDB = require("../repositories/users");
const Password = require("../utils/password");
const jwt = require('jsonwebtoken');
const users = require("../repositories/users");

require('dotenv').config();

async function autenticar(ctx) {

    const { email = null, senha = null } = ctx.request.body;

    if (email === null || senha === null) {
        return response(ctx, 400, { mensagem: 'Bad Request' });
    }

    const usuario = await UsersDB.getUserByEmail(email);

    if (usuario) {
        const comparison = await Password.check(senha, usuario.senha);

        if (comparison) {
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                process.env.JWT_SECRET,
                {
                    expiresIn: '30d'
                }
            );
            return response(ctx, 200, { token });
        }
    }
    return response(ctx, 400, { mensagem: 'Email ou senha incorretos' })

}

module.exports = { autenticar };