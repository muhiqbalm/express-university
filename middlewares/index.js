const errorHandler = require("./error-handler");
const authentication = require("./authentication");
const { authorization, adminAuthorization } = require("./authorization");

module.exports = {
  errorHandler,
  authentication,
  adminAuthorization,
  authorization,
};
