const Router = require("koa-router");

const router = new Router();
const koaSwagger = require("koa2-swagger-ui");
const yamljs = require("yamljs");

const Auth = require("./controllers/auth");
const Home = require("./controllers/home");
const Session = require("./middlewares/session");
const Password = require("./middlewares/encrypt");
const UsersController = require("./controllers/users");
const ToolsController = require("./controllers/tools");

const spec = yamljs.load("./src/swagger/openapi.yaml");

// HOME
router.get("/", Home.hello);

// HEALTH
router.get("/health", Home.health);

// User creating and authentication
router
  .post("/users/auth", Auth.authentication)
  .post("/users", Password.encrypt, UsersController.createUser);

// TOOLS
router
  .get("/tools", Session.verify, ToolsController.findTools)
  .post("/tools", Session.verify, ToolsController.createTool)
  .put("/tools/:id", Session.verify, ToolsController.editTool)
  .delete("/tools/:id", Session.verify, ToolsController.deleteTool);

// DOCS
router.get("/docs", koaSwagger.koaSwagger({ routePrefix: false, swaggerOptions: { spec } }));

module.exports = router;
