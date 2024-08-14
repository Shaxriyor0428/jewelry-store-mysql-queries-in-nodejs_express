const express = require("express");
const {
  getStatus,
  getStatusById,
  addStatus,
  deleteStatus,
  editStatus,
} = require("../controllers/status");

const router = express.Router();

router.get("/", getStatus);
router.get("/:id", getStatusById);
router.post("/post", addStatus);
router.delete("/delete/:id", deleteStatus);
router.put("/edit/:id", editStatus);

module.exports = router;
