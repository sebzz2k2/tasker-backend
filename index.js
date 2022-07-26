const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./config/db");
const routes = require("./routes");

db();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(5000, () => {
  console.log("Server running");
});
