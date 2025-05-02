const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const {
  createSale,
  getAllSales,
  updateSale,
  deleteSale,
  downloadSalesExcel
} = require("../controllers/salesController");

// create a sale
router.post("/create", protect, createSale);

// get all sales
router.get("/getSales", protect, getAllSales);

// update a sale
router.put("/update/:saleId", protect, updateSale);

// delete a sale
router.delete("/:id", protect, deleteSale);

// download sales excel data
router.get("/downloadexcel", protect, downloadSalesExcel);

module.exports = router;
