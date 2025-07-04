const morgan = require("morgan");
const route = require("./routes");
const express = require("express");
const dotenv = require("dotenv").config();
const swaggerSpec = require("./swagger");
const swaggerUi = require("swagger-ui-express");
const { errorHandler } = require("./middlewares");

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(morgan("dev"));

app.use(route);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
