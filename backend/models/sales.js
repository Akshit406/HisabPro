const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true
  },

  customerName: {
    type: String,
    required: true
  },

  itemName: {
    type: String,
    required: true
  },

  quantitySold: {
    type: Number,
    required: true
  },

  pricePerUnit: {
    type: Number,
    required: true
  },

  totalAmount: {
    type: Number,
    
  },

  category: {
    type: String
  },

  icon : {
    type: String
  },

  dateOfSale: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Pre-save middleware to calculate totalAmount
SalesSchema.pre("save", function (next) {
  if (!this.totalAmount) {
    this.totalAmount = this.quantitySold * this.pricePerUnit;
  }
  next();
});

module.exports = mongoose.model("Sales", SalesSchema);
