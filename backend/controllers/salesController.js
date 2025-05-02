const Sales = require("../models/sales");
const User = require("../models/user");
const Inventory = require("../models/inventory");
const xlsx = require("xlsx");


exports.createSale = async (req, res) => { 
    const userId = req.user.id;
    const { itemId, quantitySold, customerName } = req.body;

    try {
        if ( !itemId || !quantitySold || !customerName ) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const inventoryItem = await Inventory.findOne({ _id: itemId, userId});
        if( !inventoryItem ){
            return res.send(404).json({ message: "item not found in inventory." });
        }

        if( inventoryItem.quantity < quantitySold ){
            return res.status(400).json({ message: "Not enough stock available in inventory" });
        }

        // reduce quantity in inventory
        inventoryItem.quantity -= quantitySold;
        await inventoryItem.save();

        // create sale using inventory data
        const newSale = new Sales({
            userId,
            itemId,
            customerName,
            itemName: inventoryItem.itemName,
            quantitySold,
            pricePerUnit: inventoryItem.price,
            totalAmount: quantitySold * inventoryItem.price,
            category: inventoryItem.category
        })

        await newSale.save();
        res.status(201).json(newSale);

    }catch (err) {
        res.status(500).json({ message: "Server error." });
    }
}
    

exports.getAllSales = async (req, res) => { 
    const userId = req.user.id;
    
    try {
        if (!userId) {
            return res.status(404).json({ message: "User id not found."})
        }

        const items = await Sales.find({ userId }).sort({ dateOfSale: -1});
        res.status(200).json(items);

    }catch(err) {
        console.error("Error fetching sales items:", err.message);
        res.status(500).json({ message: "Failed to fetch items. Please try again later." });
    }
}


exports.updateSale = async (req, res) => { 
    const userId = req.user.id;
    const { saleId } = req.params;
    const { quantitySold, customerName } = req.body;
  
    try {
      const sale = await Sales.findOne({ _id: saleId, userId });
      if (!sale) return res.status(404).json({ message: "Sale not found" });
  
      const inventory = await Inventory.findOne({ _id: sale.itemId, userId });
      if (!inventory) return res.status(404).json({ message: "Inventory item not found" });
  
      // Revert old quantity
      inventory.quantity += sale.quantitySold;
  
      // Check new quantity is available
      if (inventory.quantity < quantitySold)
        return res.status(400).json({ message: "Not enough stock to update this sale" });
  
      // Deduct new quantity
      inventory.quantity -= quantitySold;
      await inventory.save();
  
      // Update sale
      sale.quantitySold = quantitySold;
      sale.customerName = customerName || sale.customerName;
      sale.totalAmount = quantitySold * sale.pricePerUnit;
      await sale.save();
  
      res.status(200).json(sale);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
}


exports.deleteSale = async (req, res) => { 
    const userId = req.user.id;
  const { id } = req.params;

  try {
    const sale = await Sales.findOne({ _id: id, userId });
    if (!sale) return res.status(404).json({ message: "Sale not found" });

    const inventory = await Inventory.findOne({ _id: sale.itemId, userId });
    if (inventory) {
      inventory.quantity += sale.quantitySold;
      await inventory.save();
    }

    await sale.deleteOne();

    res.status(200).json({ message: "Sale deleted and stock restored" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}


exports.downloadSalesExcel = async (req, res) => { 
    const userId = req.user.id;

    try {
        const sales = await Sales.find({ userId }).sort({ createdAt: -1});

        // prepare data for excel
        const data = sales.map((sale) => ({
            Customer: sale.customerName,
            Item: sale.itemName,
            Quantity: sale.quantitySold,
            PricePerUnit: sale.pricePerUnit,
            Total: sale.totalAmount,
            Category: sale.category,
            Date: sale.dateOfSale.toISOString().split("T")[0]
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Sales");
        xlsx.writeFile(wb, 'sales_details.xlsx');
        res.download('sales_details.xlsx');

    }catch (err) {
        console.error("Error creating excel sheet:", err.message);
        res.status(500).json({ message: "Server error." });
      }
}