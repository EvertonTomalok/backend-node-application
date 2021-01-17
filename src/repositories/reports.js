const database = require('../utils/database');


const databaseOperation = async (query) => {
    const result = await database.query(query);
    return result.rows.shift();
};


const totalCustomers = async (idDoUsuario) => {
    const query = {
        text: `
            SELECT COUNT(*)::int as total_clientes FROM clientes WHERE idDoUsuario = ${idDoUsuario};
        `
    };
    return await databaseOperation(query);
};


const defaultingCustomer = async (idDoUsuario) => {
    const query = {
        text: `
            SELECT count(DISTINCT iddocliente)::int as inadimplentes 
            FROM cobrancas
            INNER JOIN clientes
            ON clientes.id = cobrancas.iddocliente
            WHERE status = 'AGUARDANDO' 
            AND vencimento < current_date 
            AND clientes.idDoUsuario = ${idDoUsuario};
        `
    };
    return await databaseOperation(query);
}

const paidBoletos = async (idDoUsuario) => {
    const query = {
        text: `SELECT count(*)::int as boletos_pagos 
        FROM cobrancas 
        INNER JOIN clientes
        ON clientes.id = cobrancas.iddocliente
        WHERE status = 'PAGO'
        AND clientes.idDoUsuario = ${idDoUsuario};
        ;`,
    };
    return await databaseOperation(query);
};


const notPaidBoletos = async (idDoUsuario) => {
    const query = {
        text: `SELECT count(*)::int as boletos_nao_pagos 
        FROM cobrancas 
        INNER JOIN clientes
        ON clientes.id = cobrancas.iddocliente
        WHERE status = 'AGUARDANDO'
        AND clientes.idDoUsuario = ${idDoUsuario};`,
    };
    return await databaseOperation(query);
};


const cashFlow = async (idDoUsuario) => {
    const query = {
        text: `SELECT SUM(valor)::int total_em_caixa 
        FROM cobrancas 
        INNER JOIN clientes
        ON clientes.id = cobrancas.iddocliente
        WHERE status = 'PAGO'
        AND clientes.idDoUsuario = ${idDoUsuario};`
    };
    return await databaseOperation(query);
};


const expiredBoletos = async (idDoUsuario) => {
    const query = {
        text: `
            SELECT COUNT(*)::int as num_boletos_vencidos 
            FROM cobrancas
            INNER JOIN clientes
            ON clientes.id = cobrancas.iddocliente
            WHERE vencimento < current_date AND status = 'AGUARDANDO'
            AND clientes.idDoUsuario = ${idDoUsuario};
        `
    };
    return await databaseOperation(query);
};

module.exports = {
    expiredBoletos,
    totalCustomers,
    defaultingCustomer,
    paidBoletos,
    notPaidBoletos,
    cashFlow
};