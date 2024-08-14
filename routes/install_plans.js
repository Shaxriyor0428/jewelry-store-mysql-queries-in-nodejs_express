const express = require("express");
const {
  getInstall,
  getInstallById,
  addInstallPlan,
  deleteInstallPlan,
  editInstallPlans,
} = require("../controllers/install_plans");
const router = express.Router();

router.get("/", getInstall);
router.get("/:id", getInstallById);
router.post("/post", addInstallPlan);
router.delete("/delete/:id", deleteInstallPlan);
router.put("/edit/:id", editInstallPlans);

module.exports = router;
