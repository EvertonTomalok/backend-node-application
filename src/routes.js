const Router = require('koa-router');
const router = new Router();

const Auth = require('./controllers/auth');
const Home = require('./controllers/home');
const Session = require('./middlewares/session');
const Password = require('./middlewares/encrypt');
const UsersController = require('./controllers/users');

// HOME
router.get('/', Home.hello);

// User creating and authentication
router.post('/users/auth', Auth.authentication);
router.post('/users', Password.encrypt, UsersController.createUser);

// router.post('/clientes', Session.verify, ClientsController.addClient);
// router.put('/clientes', Session.verify, ClientsController.updateClient);
// router.get('/clientes', Session.verify, ClientsController.findClients);

// router.post('/cobrancas', Session.verify, PaymentsController.payment);
// router.put('/cobrancas', Session.verify, PaymentsController.payBillet);
// router.get('/cobrancas', Session.verify, PaymentsController.getPayments);

// router.get('/relatorios', Session.verify, ReportsController.getReports);


module.exports = router;