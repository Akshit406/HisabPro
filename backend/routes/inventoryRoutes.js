const express = require("express");
const { protect } = require("../middleware/authMiddleware"); 

const {
    createItem,
    updateItem,
    getAllItems,
    deleteItem,
    downloadInventoryExcel
} = require("../controllers/inventoryController");

const router = express.Router();

// add item to inventory
router.post( "/create",protect ,createItem );

// get all items in inventory
router.get( "/getItems",protect ,getAllItems );

// update a particular item
router.put( "/update",protect ,updateItem );

// delete an item from inventory
router.delete( "/:id",protect ,deleteItem );

//download sales excel sheet
router.get( "/downloadexcel",protect ,downloadInventoryExcel);


module.exports = router;

