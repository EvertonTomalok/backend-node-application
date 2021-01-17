const ReportsDB = require('../repositories/reports')
const response = require("./response");
const { off } = require('../utils/database');


const getReports = async (ctx) => {
    const idDoUsuario = ctx.state.userId;

    const totalCustomers = await ReportsDB.totalCustomers(idDoUsuario);
    const defaultingCustomer = await ReportsDB.defaultingCustomer(idDoUsuario);
    const paidBoletos = await ReportsDB.paidBoletos(idDoUsuario);
    const notPaidBoletos = await ReportsDB.notPaidBoletos(idDoUsuario);
    const expiredBoletos = await ReportsDB.expiredBoletos(idDoUsuario);
    const cashFlow = await ReportsDB.cashFlow(idDoUsuario);

    const report = {
        qtdClientesAdimplentes: totalCustomers.total_clientes - defaultingCustomer.inadimplentes,
        qtdClientesInadimplentes: defaultingCustomer.inadimplentes,
        qtdBoletosPagos: paidBoletos.boletos_pagos,
        qtdBoletosNaoPagos: notPaidBoletos.boletos_nao_pagos,
        qtdBoletosVencidos: expiredBoletos.num_boletos_vencidos,
        saldoEmConta: cashFlow.total_em_caixa,
    };
	return response(ctx, 200, report);
};


module.exports = { getReports };
