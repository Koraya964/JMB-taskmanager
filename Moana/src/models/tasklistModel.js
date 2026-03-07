import db from "../config/connectDB.js";

export const addTask = async (title, description) => {
    const result = await db.query(
        "INSERT INTO tasks (title, description) VALUES (?, ?)",
        [title, description]
    );
    return result.insertId;
}

    export const findById = async (user_id) => {
        // [row] = le résultat est renvoyé sous le format d'un tableau
        const [row] = await db.query("SELECT * FROM tasks WHERE user-id = ?", [user_id]);
        return row[0];
    }