require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")

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

//upload route
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});