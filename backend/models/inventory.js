const mongoose = require("mongoose");


const InventorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    itemName: {
        type: String,
        required: true
    },

    icon: {
        type: String,
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String
    }
},

{ timestamps: true }

);


module.exports = mongoose.model("Inventory", InventorySchema );