const express = require("express");
const router = express.Router();
const swagger = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio Budget",
      version: "1.0.0",
      description:
        "Simple backend API to manage portfolio budget using an envelope budgeting method",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
    },
  },
  apis: ["./routes/envelopes.js"],
};
const specs = swagger(swaggerOptions);

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);

module.exports = router;
