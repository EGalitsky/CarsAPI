const express = require("express");

const carRouter = require("./router/car-router");
const mongoDB = require("./monodb");

const app = express();
mongoDB.connect();

app.use(express.json());

app.use("/cars", carRouter);

app.use((error, request, responce, next) => {
  responce.status(500).json({ name: error.name, message: error.message });
});

app.get("/", (request, responce) => {
  responce.json("Hello world!");
});

module.exports = app;
