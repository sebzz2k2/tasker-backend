const mongoose = require("mongoose");

const Todo = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "todo",
  }
);

const model = mongoose.model("todo", Todo);

module.exports = model;
