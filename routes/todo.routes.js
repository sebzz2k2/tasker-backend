const Router = require("express");
const {
  addTodo,
  getAllTodo,
  editTodo,
  toggleTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

const { protect } = require("../middleware/auth.middleware");

const router = Router();
router.get("/all-todo", protect, getAllTodo);
router.post("/add-todo", protect, addTodo);
router.put("/edit-todo/:id", protect, editTodo);
router.put("/toggle-todo/:id", protect, toggleTodo);
router.delete("/delete-todo/:id", protect, deleteTodo);

module.exports = router;
