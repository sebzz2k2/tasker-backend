const Todo = require("../models/todo.model");
const User = require("../models/user.model");

const asyncHandler = require("express-async-handler");

const addTodo = asyncHandler(async (req, res) => {
  await Todo.create({
    user: req.user.id,
    name: req.body.name,
    completed: false,
  })
    .then((response) => res.status(200).json({ response }))
    .catch(() => {
      res.status(400);
      throw new Error("Failed to add todo");
    });
});

const getAllTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.find({ user: req.user.id });
  if (!todo) {
    user.status(401);
    throw new Error("Not updated");
  }
  res.json({ todo });
});

const deleteTodo = asyncHandler(async (req, res) => {
  const currentTodo = await Todo.findById(req.params.id);

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (currentTodo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  Todo.deleteOne({
    _id: req.params.id,
  })
    .then((response) => res.json({ response }))
    .catch(() => {
      user.status(401);
      throw new Error("Not Deleted");
    });
});

const toggleTodo = asyncHandler(async (req, res) => {
  const currentTodo = await Todo.findById(req.params.id);
  console.log(req.body.completed);

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (currentTodo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await Todo.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        completed: req.body.completed,
      },
    }
  )
    .then(() => res.status(200))
    .catch(() => {
      user.status(401);
      throw new Error("Not updated");
    });
});

const editTodo = asyncHandler(async (req, res) => {
  const currentTodo = await Todo.findById(req.params.id);

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (currentTodo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await Todo.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
      },
    }
  )
    .then(() => res.status(200))
    .catch(() => {
      user.status(401);
      throw new Error("Not updated");
    });
});

module.exports = {
  editTodo,
  toggleTodo,
  deleteTodo,
  getAllTodo,
  addTodo,
};
