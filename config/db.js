const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const db = async () => {
  await mongoose
    .connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to db"))
    .catch((err) => console.log("Connection to db failed", err));
};

module.exports = db;
// import mongoose from "mongoose";

// export default async () => {
//   await mongoose
//     .connect(process.env.DATABASE_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log("Db Connection successful");
//     })
//     .catch((err) => {
//       console.log("Failed to connect to db: ", err);
//     });
// };
