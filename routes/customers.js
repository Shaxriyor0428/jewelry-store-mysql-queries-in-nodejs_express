const express = require("express");
const {
  getCustomer,
  getCustomerById,
  addCustomer,
  customerDeleteById,
  editCustomerById,
} = require("../controllers/customers");
const router = express.Router();

router.get("/", getCustomer);
router.get("/:id", getCustomerById);
router.post("/post", addCustomer);
router.delete("/:id", customerDeleteById);
router.put("/edit/:id", editCustomerById);

module.exports = router;
