const db = require('../helpers/database');
const { off } = require('../helpers/database');

async function getUserByEmail(email) {
    const query = `SELECT * FROM usuarios WHERE email = $1`;

    const result = await db.query({
        text: query,
        values: [email]
    });

    return result.rows.shift();
}

async function createUser(email, nome, hash) {
    const query = `
    INSERT INTO usuarios (
        email,
        nome,
        senha
    ) VALUES ($1, $2, $3) RETURNING *;
    `

    const result = await db.query({
        text: query,
        values: [email, nome, hash]
    });

    return result.rows[0];
}

module.exports = { getUserByEmail, createUser };