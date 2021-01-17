const pagarme = require('../utils/pagarme');
const BoletosDB = require('../repositories/boletos')
const ClientsDB = require('../repositories/clients')
const response = require("./response");
const { off } = require('../utils/database');

const getClientInfo = async (userId) => {
	const client = await ClientsDB.findClientById(userId);
	return {
		name: client.nome,
		email: client.email,
		documents: [
			{
				"type": "cpf",
				"number": client.cpf
			}
		],
		phone_numbers: [client.telefone],
		country: "br",
		type: "individual",
	};
}


const payment = async (ctx) => {
	const {
		valor,
		idDoCliente,
		descricao = "",
		vencimento,
	} = ctx.request.body;

	if (descricao.length > 13) {
		return response(
			ctx,
			500,
			{
				mensagem: "Tamanho máximo da descrição não pode ultrapassar 13 caracteres"
			}
		);
	};

	const client = await getClientInfo(idDoCliente);

	const transaction = await pagarme.payByBoleto(valor, {
		external_id: idDoCliente,
		boleto_expiration_date: vencimento,
		soft_descriptor: descricao,
		customer: client,
	});

	if (transaction.data.boleto_url) {
		const cobranca = {
			idDoCliente,
			boletoId: transaction.data.id,
			descricao,
			valor,
			vencimento,
			linkDoBoleto: transaction.data.boleto_url,
			codigoDeBarras: transaction.data.boleto_barcode,
			status: "AGUARDANDO"
		};

		await BoletosDB.addBoleto(cobranca);
		return response(ctx, 201, { cobranca });
	}
	return response(ctx, 500, { mensagem: "Boleto não gerado!" });
};


const getPayments = async (ctx) => {
	const {
		cobrancasPorPagina = 10,
		offset = 0
	} = ctx.query;

	const idDoUsuario = ctx.state.userId;
	
	const totalBoletos = await BoletosDB.discoveryTotalBoletos(idDoUsuario);
	const totalPages = Math.ceil(totalBoletos.total_boletos / cobrancasPorPagina);
	const actualPage = (offset / cobrancasPorPagina) + 1;
	const cobrancas = await BoletosDB.findBoletos(cobrancasPorPagina, offset, idDoUsuario);
	return response(ctx, 200, { paginaAtual: actualPage, totalDePaginas: totalPages, cobrancas });
};


const payBillet = async (ctx) => {
	const idDaCobranca = ctx.request.body.idDaCobranca;

	if (!idDaCobranca) {
		return response(ctx, 500, { erro: "idDaCobranca não foi informado" });
	}

	const cobrancaPaga = await BoletosDB.updateBoletoStatus(idDaCobranca, "PAGO");

	if (cobrancaPaga.length) {
		return response(ctx, 200, { mensagem: "Cobrança paga com sucesso" });
	}
	return response(ctx, 400, { mensagem: "Não foi possivel encontrar essa cobrança." })
};


module.exports = { payment, payBillet, getPayments };