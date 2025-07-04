const express = require("express");
const router = express.Router();
const { LecturersControllers } = require("../controllers");
const { authorization, adminAuthorization } = require("../middlewares");

router.get(
  "/",
  (req, res, next) => {
    authorization(req, res, next, "lecturer");
  },
  LecturersControllers.getAllLecturers
);

router.post("/", adminAuthorization, LecturersControllers.createLecturer);

router.put(
  "/:id",
  (req, res, next) => {
    authorization(req, res, next, "lecturer");
  },
  LecturersControllers.getAllLecturers,
  LecturersControllers.updateLecturer
);

router.get(
  "/:id",
  (req, res, next) => {
    authorization(req, res, next, "lecturer");
  },
  LecturersControllers.getAllLecturers,
  LecturersControllers.getLecturerById
);

router.patch(
  "/:id",
  (req, res, next) => {
    authorization(req, res, next, "lecturer");
  },
  LecturersControllers.getAllLecturers,
  LecturersControllers.patchLecturer
);

router.delete("/:id", adminAuthorization, LecturersControllers.deleteLecturer);

module.exports = router;
