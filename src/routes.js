const express = require("express");

const authentication = require("./middleware/authentication");

const routes = express.Router();

const auth = require("./user/routes");
const post = require("./post/routes");

routes.use("/auth", auth);
routes.use("/post", authentication, post);

module.exports = routes;