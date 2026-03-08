import db from "../config/connectDB.js";



// CREATION NOUVELLE TACHE
export const createTask = async (title, description, user_id) => {
    const [result] = await db.query(
        "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
        [title, description, user_id]
    );

    return result.insertId;
}

// TROUVER TOUTE LES TACHES (réponse format tableau)
    export const findAllByUserId = async (user_id) => {
        const [rows] = await db.query(
            "SELECT * FROM tasks WHERE user-id = ?",
            [user_id]
        );

        // SI PAS DE REPONSE AFFICHE NULL
        return rows[0] || null;
    }

// TROUVER UNE TACHE VIA USER_ID (réponse format tableau)
    export const findByUserId = async (user_id) => {
        const [rows] = await db.query(
            "SELECT * FROM tasks WHERE user-id = ?",
            [user_id]
        );

        // SI PAS DE REPONSE AFFICHE NULL
        return rows[0] || null;
    }