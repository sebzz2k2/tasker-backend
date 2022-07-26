const Router = require("express");
const todoRouter = require("./todo.routes");

const router = Router();

router.use("/todo", todoRouter);

module.exports = router;
