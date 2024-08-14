const express = require("express");
const { getPayment, getPaymentById, addPayment, deletePayment, editpayments } = require("../controllers/payments");
const router = express.Router();

router.get("/", getPayment);
router.get("/:id", getPaymentById);
router.post("/post", addPayment);
router.delete("/delete/:id", deletePayment);
router.put("/edit/:id", editpayments);

module.exports = router;
