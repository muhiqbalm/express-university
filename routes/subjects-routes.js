const express = require("express");
const router = express.Router();
const { SubjectsControllers } = require("../controllers");
const { adminAuthorization } = require("../middlewares");

router.get("/", SubjectsControllers.getAllSubjects);
router.post("/", SubjectsControllers.createSubject);
router.put("/:id", adminAuthorization, SubjectsControllers.updateSubject);
router.get("/:id", adminAuthorization, SubjectsControllers.getSubjectById);
router.patch("/:id", adminAuthorization, SubjectsControllers.patchSubject);
router.delete("/:id", adminAuthorization, SubjectsControllers.deleteSubject);

module.exports = router;
