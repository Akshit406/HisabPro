const User = require("../models/user");
const Inventory = require("../models/inventory");
const xlsx = require("xlsx");

//create item
exports.createItem = async (req, res) => { 
    const userId = req.user.id;

    try {
        const { itemName, icon, quantity, price, category} = req.body;

        //validation for missing fields
        if ( !itemName || !quantity || !price) {
            return res.status(400).json({ message: "All fields are required." })
        }

        const newItem = new Inventory({
            userId,
            itemName,
            icon,
            quantity,
            price,
            category
        });

        await newItem.save();
        res.status(200).json(newItem);
    } catch (err) {
        res.status(500).json({ message: "Server error." });
    }
}

// update item 
exports.updateItem = async (req, res) => {
    //user objects comes from protect middleware
    const userId = req.user.id;
    const { id } = req.body;
  
    try {
      const { itemName, icon, quantity, price, category } = req.body;
  
      if (!id) {
        return res.status(400).json({ message: "Item ID is required." });
      }
  
      // Find the item
      const item = await Inventory.findOne({ _id: id, userId });
  
      if (!item) {
        return res.status(404).json({ message: "Item not found or not authorized." });
      }
  
      // Update fields if provided
      if (itemName) item.itemName = itemName;
      if (icon) item.icon = icon;
      if (quantity !== undefined) item.quantity = quantity;
      if (price !== undefined) item.price = price;
      if (category) item.category = category;
  
      await item.save();
      res.status(200).json({ message: "Item updated successfully.", item });
  
    } catch (error) {
      console.error("Error updating item:", error);
      res.status(500).json({ message: "Server error." });
    }};


// get all items from the inventory collection
exports.getAllItems = async (req, res) => {
    const userId = req.user.id;

    try {
        const items = await Inventory.find({userId}).sort({ createdAt: -1 });
        res.status(200).json(items);
    }catch (err) {
        console.error("Error fetching inventory items:", err.message);
        res.status(500).json({ message: "Failed to fetch items. Please try again later." });
      }
};

//delete an item from inventory
exports.deleteItem = async (req, res) => {
    const userId = req.user.id;
    const itemId = req.params.id;

    try {
        const item = await Inventory.findOneAndDelete({ _id: itemId, userId });
    
        if (!item) {
          return res.status(404).json({ message: "Item not found or unauthorized." });
        }
    
        res.status(200).json({ message: "Item deleted successfully." });
      } catch (err) {
        console.error("Error deleting item:", err.message);
        res.status(500).json({ message: "Server error while deleting item." });
      }
};

// download excel sheet for inventory
exports.downloadInventoryExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const inventory = await Inventory.find({ userId }).sort({ createdAt: -1});


        // prepare data for excel 
        const data = inventory.map((item) => ({
            Name: item.itemName,
            Quantity: item.quantity,
            Price: item.price,
            Category: item.category,
            Date: item.createdAt.toISOString().split('T')[0]

        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Inventory");
        xlsx.writeFile(wb, 'inventory_details.xlsx');
        res.download('inventory_details.xlsx');
    }catch (err) {
        console.error("Error creating excel sheet:", err.message);
        res.status(500).json({ message: "Server error." });
      }
};

