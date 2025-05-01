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

router.post( "/create",protect ,createItem );

router.get( "/getItems",protect ,getAllItems );

router.put( "/update",protect ,updateItem );

router.delete( "/:id",protect ,deleteItem );

router.get( "/downloadexcel",protect ,downloadInventoryExcel);


module.exports = router;

