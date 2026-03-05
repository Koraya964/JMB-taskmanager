import db from "../config/connectDB.js";

export const createUser_model = async (username, email, password_hash) => {
  const result = await db.query(
    "INSERT INTO users (username, email, password_hash) VALUES (?,?,?)",
    [username, email, password_hash],
  );
  return result.insertId;
};

export const findUserByEmail_model = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};


