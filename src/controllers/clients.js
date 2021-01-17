const { isValidCPF } = require('@brazilian-utils/brazilian-utils');
const response = require("./response");
const ClientsDB = require('../repositories/clients')

const { off } = require('../helpers/database');


const sanitazeCPF = (cpf) => {
    return cpf.replace(/\.|-/g, "");
};


const addClient = async (ctx) => {
	let {
		nome,
		cpf = "",
		email,
		tel,
    } = ctx.request.body;

    const idDoUsuario = ctx.state.userId;
    
    cpf = sanitazeCPF(cpf);

    if (!isValidCPF(cpf)){
        return response(ctx, 400, {erro: "CPF INVÁLIDO!"})
    };
	
    const clientId = await ClientsDB.addClient(nome, cpf, email, tel, idDoUsuario);

    return response(ctx, 201, clientId);
};


const updateClient = async (ctx) => {
	let {
        id,
		nome,
		cpf = "",
		email,
		tel,
    } = ctx.request.body;

    const idDoUsuario = ctx.state.userId;
    
    cpf = sanitazeCPF(cpf);

    if (!isValidCPF(cpf)){
        return response(ctx, 200, {erro: "CPF INVÁLIDO!"})
    };
	
    const rowData = await ClientsDB.updateClient(id, nome, cpf, email, tel, idDoUsuario);

    return response(ctx, 200, rowData);
};


const findClients = async (ctx) => {
    const {
        busca = "",
		clientesPorPagina = 10,
		offset = 0
    } = ctx.query;

    const idDoUsuario = ctx.state.userId;

    const totalClients = await ClientsDB.discoveryClients(idDoUsuario, busca);
	const totalPages = Math.ceil(totalClients.total_clientes / clientesPorPagina);
    const actualPage = (offset / clientesPorPagina) + 1;
    
    const clientes = await ClientsDB.findClients(clientesPorPagina, offset, busca, idDoUsuario);
    
    return response(ctx, 200, { paginaAtual: actualPage, totalDePaginas: totalPages, clientes });
};


module.exports = { addClient, findClients, updateClient };
