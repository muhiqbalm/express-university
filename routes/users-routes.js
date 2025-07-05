const express = require("express");
const { UsersControllers } = require("../controllers");
const { authentication, adminAuthorization } = require("../middlewares");
const router = express.Router();

router.post("/login", UsersControllers.login);
router.post(
  "/register",
  // authentication,
  // adminAuthorization,
  UsersControllers.register
);

router.get(
  "/",
  authentication,
  adminAuthorization,
  UsersControllers.getAllUsers
);

module.exports = router;
