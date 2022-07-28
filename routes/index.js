const Router = require("express");
const todoRouter = require("./todo.routes");
const userRoutes = require("./user.routes");

const router = Router();

router.use("/todo", todoRouter);
router.use("/user", userRoutes);

module.exports = router;
