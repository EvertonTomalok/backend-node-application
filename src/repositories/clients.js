const database = require('../utils/database');


const addClient = async (nome, cpf, email, telefone, idDoUsuario) => {
    const query = {
        text: `
            INSERT INTO clientes (
                nome, 
                cpf, 
                email, 
                telefone,
                idDoUsuario
            ) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING id;
        `,
        values: [nome, cpf, email, telefone, idDoUsuario],
    };
    const result = await database.query(query);
    return result.rows.shift();
};


const updateClient = async (id, nome, cpf, email, telefone, idDoUsuario) => {
    const query = {
        text: `
            UPDATE clientes
            SET nome = '${nome}',
                cpf = '${cpf}',
                email = '${email}',
                telefone = '${telefone}'
            WHERE id = ${id} 
            AND idDoUsuario = ${idDoUsuario}
            RETURNING id, nome, cpf, email, telefone;
        `
    };
    const result = await database.query(query);
    return result.rows.shift();
};


const findClientById = async (idDoCliente) => {
    const query = {
        text: `
            SELECT *
            FROM clientes
            WHERE id = ${idDoCliente}
		`
    };
    const result = await database.query(query);
    return result.rows.shift();
};

const buildSearchQuery = ( search = "" ) => {
    return (
        !search ?
        "" :
        ` 
            AND nome ILIKE '%${search}%' 
            OR cpf ILIKE '%${search}%' 
            OR email ILIKE '%${search}%' 
            OR telefone ILIKE '%${search}%'
        `
    );
}

const discoveryClients = async (idDoUsuario, search = "") => {
    const searchQuery = buildSearchQuery(search);
    const query = {
        text: `
            SELECT 
                COUNT(*) as total_clientes 
            FROM clientes 
            WHERE idDoUsuario = ${idDoUsuario}
            ${searchQuery}
        `
    };
    const result = await database.query(query);
    if (Array.isArray(result.rows)){
        return result.rows.shift();
    }
    return { total_clientes: 0 }
    
}

const findClients = async (numberPerPage = 10, offset = 0, search = "", idDoUsuario) => {
    const searchQuery = buildSearchQuery(search);

    const query = {
        text: `
        SELECT 
            cli.id,
            cli.nome, 
            cli.email,
            coalesce (SUM(cob.valor), 0) as cobrancas_total,
            coalesce (SUM (cob.valor) FILTER(where status = 'PAGO'),0) as cobrancas_pago,
            CASE WHEN (COUNT(*) FILTER (WHERE status = 'AGUARDANDO' AND vencimento < current_date)) > 0 
                THEN 
                    true 
                ELSE 
                    false 
            END as inadimplente
        FROM clientes cli
        LEFT JOIN cobrancas cob 
        ON cob.iddocliente = cli.id 
        WHERE cli.idDoUsuario = ${idDoUsuario} 
        ${searchQuery}
        GROUP BY cli.id, cli.nome, cli.email
        ORDER BY cli.nome
        OFFSET ${offset}
        LIMIT ${numberPerPage}
		`
    };
    const result = await database.query(query);
    return result.rows;
};


module.exports = { addClient, discoveryClients, findClients, findClientById, updateClient };
