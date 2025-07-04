const usersRoutes = require("./users-routes");
const studentsRoutes = require("./students-routes");
const subjectsRoutes = require("./subjects-routes");
const lecturersRoutes = require("./lecturers-routes");
const studyplansRoutes = require("./studyplans-routes");
const { authentication } = require("../middlewares");

const express = require("express");
const route = express.Router();

route.use("/users", usersRoutes);

route.use("/students", authentication, studentsRoutes);

route.use("/studyplans", authentication, studyplansRoutes);

route.use("/lecturers", authentication, lecturersRoutes);

route.use("/subjects", authentication, subjectsRoutes);

module.exports = route;
