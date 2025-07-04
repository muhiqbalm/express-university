const express = require("express");
const router = express.Router();
const { StudentsControllers } = require("../controllers");
const { adminAuthorization, authorization } = require("../middlewares");

// ONLY ADMIN
router.get("/", adminAuthorization, StudentsControllers.getAllStudents);
router.post("/", adminAuthorization, StudentsControllers.createStudent);
router.delete("/:id", adminAuthorization, StudentsControllers.deleteStudent);

// ADMIN AND STUDENT WITH ID
router.put(
  "/:id",
  (req, res, next) => {
    authorization(req, res, next, "student");
  },
  StudentsControllers.updateStudent
);

router.get(
  "/:id",
  (req, res, next) => {
    authorization(req, res, next, "student");
  },
  StudentsControllers.getStudentById
);

router.patch(
  "/:id",
  (req, res, next) => {
    authorization(req, res, next, "student");
  },
  StudentsControllers.patchStudent
);

module.exports = router;
