const express = require("express");
const router = express.Router();
const productController = require("../controller/productControler");

router.get(
  "/productList/:pageNo/:perPage/:searchKeyword",
  productController.productList
);

 
module.exports = router;
