const mongoose = require("mongoose");

module.exports = db = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/todo")
    .then(() => console.log("Connected to db"))
    .catch(() => console.log("Connection to db failed"));
};
