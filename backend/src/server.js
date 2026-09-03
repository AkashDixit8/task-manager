const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");
const taskRoutes = require("./routes/tasks");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Root endpoint
app.get("/", (req, res) => {
    res.json({
        message: "Task Manager Backend is running"
    });
});


// Health check
app.get("/api/health", async (req, res) => {

    try {

        await pool.query("SELECT 1");

        res.status(200).json({
            status: "OK",
            database: "Connected"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "ERROR",
            database: "Disconnected"
        });

    }

});


// Task routes
app.use("/api/tasks", taskRoutes);


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Backend running on port ${PORT}`);

});