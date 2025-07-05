const express = require("express");
const router = express.Router();
const { LecturersControllers } = require("../controllers");

router.get("/", LecturersControllers.getAllLecturers);
router.post("/", LecturersControllers.createLecturer);
router.put("/:id", LecturersControllers.updateLecturer);
router.get("/:id", LecturersControllers.getLecturerById);
router.patch("/:id", LecturersControllers.patchLecturer);
router.delete("/:id", LecturersControllers.deleteLecturer);

module.exports = router;
