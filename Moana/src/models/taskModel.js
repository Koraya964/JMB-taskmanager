import db from "../config/connectDB.js";


export const createTask = async ({ user_id, title, description }) => {
    const [result] = await db.execute(
        "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)",
        [user_id, title, description]
    );

    return {
        id: result.insertId,
        user_id,
        title,
        description
    };
};

export const getAllTasks = async (user_id) => {
    const [rows] = await db.execute(
        "SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC",
        [user_id]
    );
    return rows;
};

