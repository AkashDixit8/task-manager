const express = require("express");
const router = express.Router();

const pool = require("../db");


// GET ALL TASKS
router.get("/", async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT * FROM tasks ORDER BY created_at DESC"
        );

        res.status(200).json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to fetch tasks"
        });

    }

});


// CREATE TASK
router.post("/", async (req, res) => {

    try {

        const { title } = req.body;

        if (!title || !title.trim()) {

            return res.status(400).json({
                error: "Task title is required"
            });

        }

        const [result] = await pool.query(
            "INSERT INTO tasks (title) VALUES (?)",
            [title.trim()]
        );

        res.status(201).json({
            id: result.insertId,
            title: title.trim(),
            completed: false
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to create task"
        });

    }

});


// DELETE TASK
router.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const [result] = await pool.query(
            "DELETE FROM tasks WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                error: "Task not found"
            });

        }

        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to delete task"
        });

    }

});


module.exports = router;