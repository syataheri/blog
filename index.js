require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");

const routes = require("./src/routes");
const handleResponse = require("./src/middleware/handleResponses");
const { swaggerDocs } = require("./swagger");

const port = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use(logger("dev"));
app.use(cors());
app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocs, { explorer: true })
);
app.use("/api", handleResponse, routes);
const server = app.listen(port, () => {
  console.log("server is listening on port:", port);
});

module.exports = { server };
