import { getAllTasks, createTask, deleteTaskById } from "../models/TaskModel.js";

// GET /tasks
export const listTasks = async (req, res) => {
    try {
        const tasks = await getAllTasks();
        return res.json(tasks);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// POST /tasks
export const addTask = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Titre obligatoire" });
    }

    try {
        await createTask(title);
        return res.json({ message: "Tâche ajoutée" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// DELETE /tasks/:id
export const removeTask = async (req, res) => {
    const { id } = req.params;

    try {
        await deleteTaskById(id);
        return res.json({ message: "Tâche supprimée" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
