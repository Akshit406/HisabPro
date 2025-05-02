require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const salesRoutes = require("./routes/salesRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

//middelware to handle cors
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

//mongoDB connection
connectDB();

//authentication api
app.use("/api/v1/auth", authRoutes );

//upload routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//inventory routes
app.use("/api/v1/inventory", inventoryRoutes );

//sales routes
app.use("/api/v1/sales", salesRoutes );

//dashboard routes
app.use("/api/v1/dashboard", dashboardRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});