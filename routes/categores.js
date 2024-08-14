const express = require("express");
const {
  getCategory,
  getCategoryById,
  addcategory,
  categroyDeleteById,
  editCategory,
} = require("../controllers/categores");
const router = express.Router();

router.get("/", getCategory);
router.get("/:id", getCategoryById);
router.post("/post", addcategory);
router.delete("/delete/:id", categroyDeleteById);
router.put("/edit/:id", editCategory);

module.exports = router;
