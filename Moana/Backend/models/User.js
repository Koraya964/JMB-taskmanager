import db from "../config/connectDB.js";


export const createUser = async (username, email, password_hash) => {
    const result = await db.query(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
        [username, email, password_hash]
    );
    return result.insertId;
}

    export const findByEmail = async (email) => {
        // [row] = le résultat est renvoyé sous le format d'un tableau
        const [row] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        return row[0];
    }

