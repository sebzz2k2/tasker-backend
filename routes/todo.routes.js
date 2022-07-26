const Router = require("express");
const {
  addTodo,
  getAllTodo,
  editTodo,
  toggleTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

const router = Router();
router.get("/all-todo", getAllTodo);
router.post("/add-todo", addTodo);
router.put("/edit-todo/:id", editTodo);
router.put("/toggle-todo/:id", toggleTodo);
router.delete("/delete-todo/:id", deleteTodo);

module.exports = router;
