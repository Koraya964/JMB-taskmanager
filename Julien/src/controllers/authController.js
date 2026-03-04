import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import db from '../models/db.js';

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

// POST /api/auth/register
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ error: 'Tous les champs sont requis' });

  if (password.length < 12)
    return res.status(400).json({ error: 'Mot de passe trop court (12 car. min.)' });

  try {
    const [existing] = await db.query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );
    if (existing.length > 0)
      return res.status(409).json({ error: 'Identifiant déjà utilisé' });

    // Hash du mot de passe en argon et INSERT dans la bdd
    const hash = await argon2.hash(password);
    const [result] = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hash]
    );

    const token = signToken({ id: result.insertId, username, email });
    res.cookie('token', token, COOKIE_OPTS);//Cookie généré sur server.js et récupération des options (OPTS)
    return res.status(201).json({ message: 'Compte créé', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email et mot de passe requis' });

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length)
      return res.status(401).json({ error: 'Identifiant incorrect' });

    const user = rows[0];
    const valid = await argon2.verify(user.password_hash, password);
    if (!valid)
      return res.status(401).json({ error: 'Identifiant incorrect' });

    const token = signToken({ id: user.id, username: user.username, email: user.email });
    res.cookie('token', token, COOKIE_OPTS);
    return res.status(200).json({ message: 'Connexion réussie', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /api/auth/logout
export const logout = (_req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Déconnecté' });
};

// GET /api/auth/me
export const me = (req, res) =>
  res.json({ id: req.user.id, username: req.user.username, email: req.user.email });
