const express = require("express");
const auth = require("../routes/auth");
const category = require("../routes/category");
const cors = require("cors");

module.exports = function (app) {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );

  app.use("/api/v1", auth);
  app.use("/api/v1", category);
};
