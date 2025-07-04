const express = require("express");
const router = express.Router();
const { StudyPlansControllers } = require("../controllers");
const { adminAuthorization } = require("../middlewares");

router.get("/", StudyPlansControllers.getAllStudyPlans);

router.post(
  "/:id",
  (req, res, next) => {
    authorization(req, res, next, "student");
  },
  StudyPlansControllers.createStudyPlan
);

router.put(
  "/:id",
  (req, res, next) => {
    authorization(req, res, next, "student");
  },
  StudyPlansControllers.updateStudyPlan
);

router.get(
  "/:id",
  (req, res, next) => {
    authorization(req, res, next, "student");
  },
  StudyPlansControllers.getStudyPlanById
);

router.patch(
  "/:id",
  (req, res, next) => {
    authorization(req, res, next, "student");
  },
  StudyPlansControllers.patchStudyPlan
);

router.delete(
  "/:id",
  (req, res, next) => {
    authorization(req, res, next, "student");
  },
  StudyPlansControllers.deleteStudyPlan
);

module.exports = router;
