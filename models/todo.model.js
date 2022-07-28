const mongoose = require("mongoose");

const Todo = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
