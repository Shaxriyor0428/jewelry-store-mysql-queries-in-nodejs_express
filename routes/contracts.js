const express = require("express");

const {
  getContract,
  getcontractById,
  addContract,
  contractDeletById,
  editContract,
} = require("../controllers/contracts");
const router = express.Router();

router.get("/", getContract);
router.put("/edit/:id", editContract);
router.delete("/delete/:id", contractDeletById);
router.get("/:id", getcontractById);

router.post("/post", addContract);

module.exports = router;
