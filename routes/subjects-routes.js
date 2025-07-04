const express = require("express");
const router = express.Router();
const { SubjectsControllers } = require("../controllers");

router.get("/", SubjectsControllers.getAllSubjects);
router.post("/", SubjectsControllers.createSubject);
router.put("/:id", SubjectsControllers.updateSubject);
router.get("/:id", SubjectsControllers.getSubjectById);
router.patch("/:id", SubjectsControllers.patchSubject);
router.delete("/:id", SubjectsControllers.deleteSubject);

module.exports = router;
