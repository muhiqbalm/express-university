const express = require("express");
const router = express.Router();
const { StudentsControllers } = require("../controllers");

router.get("/", StudentsControllers.getAllStudents);
router.post("/", StudentsControllers.createStudent);
router.put("/:id", StudentsControllers.updateStudent);
router.get("/:id", StudentsControllers.getStudentById);
router.patch("/:id", StudentsControllers.patchStudent);
router.delete("/:id", StudentsControllers.deleteStudent);

module.exports = router;
