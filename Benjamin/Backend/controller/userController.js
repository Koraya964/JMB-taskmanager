import dotenv from "dotenv";
import { createUser_model, findUserByEmail_model } from "../models/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../../.env" });

export const loginUser_controller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail_model(email);

    if (!user) {
      return res.status(400).json({ message: "email ou mdp invalide" });
    }
    const valid = await argon2.verify(user.password_hash, password);
    if (!valid) {
      return res.status(400).json({ message: "email ou mdp invalide" });
    }

    const key = process.env.JWT_SECRET;
    const token = jwt.sign({ username: user.username, user_id: user.id }, key, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      user_id: user.id,
      username: user.username,
      token: token,
      message: "Connexion validée",
    });
  } catch (error) {
    return res.status(500).json({ message: "Aucun utilisateur ou email" });
  }
};

export const registerUser_controller = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Tous les champs doivent être remplis" });
    }

    if (password.length < 7) {
      return res.status(401).json({
        password: password.length,
        message: "Mot de passe doit être au moins de 7 characteres",
      });
    }

    const existing = await findUserByEmail_model(email);

    if (existing) {
      return res.status(409).json({ message: "email déja utilisé" });
    }

    const hash = await argon2.hash(password);

    await createUser_model(username, email, hash);
    return res.status(200).json({ message: "Compte créer" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "erreur serveur", error: error.message });
  }
};
