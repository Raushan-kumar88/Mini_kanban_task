const express = require('express');
const router = express.Router();
let Database = [];
let idCounter = 1;

// GET ALL TASKS
router.get("/", (req, res) => {
    return res.status(200).json({
        message: "All task",
        status: 200,
        tasks: Database
    });
});

// CREATE TASK
router.post("/", (req, res) => {
    const { title } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json(
            {
                message: "Title is required",
                status: 400
            }
        );
    }

    const newTask = {
        id: idCounter++,
        title: title.trim(),
        status: "todo",
    };

    Database.push(newTask);
    res.status(201).json({
        message: "task create successfully",
        status: 201,
        tasks: newTask
    });
});

// UPDATE TASK
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!["todo", "done"].includes(status)) {
        return res.status(400).json(
            {
                message: "Invalid status! check proper",
                status: 400
            }
        );
    }

    const task = Database.find((txt) => txt.id === id);

    if (!task) {
        return res.status(404).json(
            {
                message: "Task not found!",
                status: 404
            }
        );
    }

    task.status = status;
    res.status(200).json({
        message: 'update this task successfully!',
        status: 200,
        tasks: task
    });
});

// DELETE TASK
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = Database.findIndex((txt) => txt.id === id);

    if (index === -1) {
        return res.status(404).json(
            {
                message: "Task not found",
                status: 404
            }
        );
    }

    Database.splice(index, 1);
    res.status(200).json({
        message: "Deleted successfully!",
        status: 200
    });
});

module.exports = router;