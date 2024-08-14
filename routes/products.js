const express = require("express");
const { getProduct, getProductById, addProduct, DeleteProduct, editProduct, soldProducts, contractExpered } = require("../controllers/products");
const router = express.Router();

router.get("/sold",soldProducts);
router.get("/expered",contractExpered);

router.get("/", getProduct);
router.get("/:id", getProductById);

router.post("/post", addProduct);
router.delete("/delete/:id", DeleteProduct);
router.put("/edit/:id", editProduct);

module.exports = router;
