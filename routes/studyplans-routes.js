const express = require("express");
const router = express.Router();
const { StudyPlansControllers } = require("../controllers");

router.get("/", StudyPlansControllers.getAllStudyPlans);
router.post("/", StudyPlansControllers.createStudyPlan);
router.put("/:id", StudyPlansControllers.updateStudyPlan);
router.get("/:id", StudyPlansControllers.getStudyPlanById);
router.patch("/:id", StudyPlansControllers.patchStudyPlan);
router.delete("/:id", StudyPlansControllers.deleteStudyPlan);

module.exports = router;
