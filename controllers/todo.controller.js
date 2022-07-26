const Todo = require("../models/todo.model");

const addTodo = async (req, res) => {
  await Todo.create({
    name: req.body.name,
    completed: false,
  });
};

const getAllTodo = async (req, res) => {
  const todo = await Todo.find({});
  res.json({ todo });
};
const deleteTodo = async (req, res) => {
  Todo.deleteOne({
    _id: req.params.id,
  })
    .then((response) => res.json({ response }))
    .catch((err) => console.log(err));
};

const toggleTodo = async (req, res) => {
  await Todo.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        completed: req.body.completed,
      },
    }
  ).then((response) => res.json({ response }));
};

const editTodo = async (req, res) => {
  await Todo.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
      },
    }
  ).then((response) => res.json({ response }));
};

module.exports = {
  editTodo,
  toggleTodo,
  deleteTodo,
  getAllTodo,
  addTodo,
};
