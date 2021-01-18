const Router = require("koa-router");

const router = new Router();

const Auth = require("./controllers/auth");
const Home = require("./controllers/home");
const Session = require("./middlewares/session");
const Password = require("./middlewares/encrypt");
const UsersController = require("./controllers/users");
const ToolsController = require("./controllers/tools");

// HOME
router.get("/", Home.hello);

// User creating and authentication
router
  .post("/users/auth", Auth.authentication)
  .post("/users", Password.encrypt, UsersController.createUser);

// TOOLS
router
  .get("/tools", Session.verify, ToolsController.findTools)
  .post("/tools", Session.verify, ToolsController.createTool)
  .put("/tools", Session.verify, ToolsController.editTool)
  .delete("/tools/:id", Session.verify, ToolsController.deleteTool);

module.exports = router;
