const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const productsRouter = require("./products");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Server ok");
});

//routes

server.use("/products", productsRouter);

console.log(listEndpoints(server));

server.listen(process.env.PORT || 3003, () =>
  console.log("Running on", process.env.PORT || 3003)
);
