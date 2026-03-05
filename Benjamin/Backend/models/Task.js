import db from "../config/connectDB.js";

export const findTaskByUserId_model = async (user_id) => {
  const [rows] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [
    user_id,
  ]);
  return rows;
};

export const createTask_model = async (user_id, title, description) => {
  const result = await db.query(
    "INSERT INTO tasks (user_id,title,description) VALUES (?,?,?)",
    [user_id, title, description],
  );
  return result.insertId;
};

export const updateState_model = async (id, is_done) => {
  const result = await db.query("UPDATE tasks SET is_done=? WHERE id=?", [
    is_done,
    id,
  ]);
  return result;
};

export const deleteTask_model = async (id) => {
  const result = await db.query("DELETE FROM tasks WHERE id=?", [id]);
  return result;
};
