const Inventory = require("../models/inventory");
const Sales = require("../models/sales");
const mongoose = require("mongoose");

exports.getDashboardData = async (req, res) => {
    const userId = req.user.id;

    const now = new Date();
    const last30Days = new Date(now.setDate(now.getDate() - 30));
    const last60Days = new Date(now.setDate(now.getDate() - 30)); // Already 30 days less, subtract 30 more

    try {
        // total items stocked in last 60 days
        const stocked60 = await Inventory.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), createdAt: { $gte: last60Days } } },
            { $group: { _id: null, total: { $sum: "$quantity" } } }
        ]);

        // total items sold in last 60 days
        const sold60 = await Sales.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), createdAt: { $gte: last60Days } } },
            { $group: { _id: null, total: { $sum: "$quantitySold" } } }
        ]);

        // items stocked in last 30 days
        const stocked30 = await Inventory.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), createdAt: { $gte: last30Days } } },
            { $group: { _id: null, total: { $sum: "$quantity" } } }
        ]);

        // items sold in last 30 days
        const sold30 = await Sales.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), createdAt: { $gte: last30Days } } },
            { $group: { _id: null, total: { $sum: "$quantitySold" } } }
        ]);

        // current inventory value
        const inventoryValue = await Inventory.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: null, value: { $sum: { $multiply: ["$quantity", "$price"] } } } }
        ]);

        // best-Selling Item (last 30 days)
        const bestSeller = await Sales.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), createdAt: { $gte: last30Days } } },
            { $group: { _id: "$itemName", totalSold: { $sum: "$quantitySold" } } },
            { $sort: { totalSold: -1 } },
            { $limit: 1 }
        ]);

        // total revenue generated all time
        const totalRevenue = await Sales.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);

        // most recent items stocked (last 5) 
        const recentStocks = await Inventory.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5);

        // most recent sales (last 5)
        const recentSales = await Sales.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5);

        // revenue share by top items (limit 5)
        const revenueShare = await Sales.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            {
            $group: {
                _id: "$itemName",
                revenue: { $sum: "$totalAmount" }
            }
            },
            { $sort: { revenue: -1 } },
            { $limit: 5 }
        ]);

        // Top items sold in last 30 days
        const topItemsSold = await Sales.aggregate([
            {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                createdAt: { $gte: last30Days }
            }
            },
            {
            $group: {
                _id: "$itemName",
                totalQuantitySold: { $sum: "$quantitySold" }
            }
            },
            { $sort: { totalQuantitySold: -1 } },
            { $limit: 10 }
        ]);
        
        

        res.status(200).json({
            totalStocked60Days: stocked60[0]?.total || 0,
            totalSold60Days: sold60[0]?.total || 0,
            stocked30Days: stocked30[0]?.total || 0,
            sold30Days: sold30[0]?.total || 0,
            currentInventoryValue: inventoryValue[0]?.value || 0,
            bestSellingItem: bestSeller[0]?._id || "N/A",
            totalRevenue: totalRevenue[0]?.total || 0,
            recentSales,
            recentStocks,
            revenueShare,
            topItemsSold
        });
    } catch (err) {
        console.error("Dashboard error:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
