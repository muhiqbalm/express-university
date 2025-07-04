const usersRoutes = require("./users-routes");
const studentsRoutes = require("./students-routes");
const subjectsRoutes = require("./subjects-routes");
const lecturersRoutes = require("./lecturers-routes");
const studyplansRoutes = require("./studyplans-routes");
const { authentication, adminAuthorization } = require("../middlewares");

const express = require("express");
const route = express.Router();

route.use("/users", usersRoutes);
route.use("/students", authentication, adminAuthorization, studentsRoutes);
route.use("/subjects", authentication, adminAuthorization, subjectsRoutes);
route.use("/lecturers", authentication, adminAuthorization, lecturersRoutes);
route.use("/studyplans", authentication, adminAuthorization, studyplansRoutes);

module.exports = route;
