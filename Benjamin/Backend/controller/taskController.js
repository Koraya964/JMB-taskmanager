import {
  createTask_model,
  findTaskByUserId_model,
  updateState_model,
  deleteTask_model,
} from "../models/Task.js";

export const createTask_controller = async (req, res) => {
  const { user_id, title, description } = req.body;
  try {
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Tous les champs doivent être remplis" });
    }

    await createTask_model(user_id, title, description);

    return res.status(200).json({ message: "Tâche ajoutée" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTasks_controller = async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await findTaskByUserId_model(user_id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
