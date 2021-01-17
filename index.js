const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
const cors = require('@koa/cors');
const PORT = process.env.PORT || 3000;

const server = new Koa();

const options = {
    origin: '*'
};

server.use(cors(options));
server.use(bodyparser());
server.use(router.routes());

server.listen(PORT, '0.0.0.0', () => console.log('Rodando na porta: ', PORT));