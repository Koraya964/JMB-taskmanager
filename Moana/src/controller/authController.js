import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { createUser, findByEmail } from "../models/UserModel.js";

// ======================================================================================
//                          AUTH CONTROLLER REGISTER
// ======================================================================================

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Veuillez remplir tous les champs" });
    }

    if (password.length > 12) {
        return res.status(400).json({ message: "Votre mot de passe est trop court" });
    }

    try {
        const exists = await findByEmail(email);
        if (exists) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        const hash = await argon2.hash(password);

        await createUser(username, email, hash);
        return res.json({ message: "Utilisateur créé" });

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


// =======================================================================================
//                          LOGIN
// =======================================================================================

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: "Email incorrect" });
        }
        // variables de la tables de données
        const valid = await argon2.verify(user.password_hash, password);
        if (!valid) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        const key = process.env.JWT_SECRET;
        const token = jwt.sign(
            { id: user.id, email: user.email },
            key,
            { expiresIn: "24h" }
        );

        return res.status(200).json({ message: "Connecté", token: token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
