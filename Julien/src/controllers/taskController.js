import db from '../models/db.js';

// GET /api/tasks (get de l'overview des tasks)
export const getTasks = async (req, res) => {
  const { id: userId } = req.user;
  const { category, priority, tag, is_done } = req.query;

  try {
    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [userId];

    if (category) { query += ' AND category = ?'; params.push(category); }
    if (priority) { query += ' AND priority = ?'; params.push(priority); }
    if (tag) { query += ' AND tag LIKE ?'; params.push(`%${tag}%`); }
    if (is_done !== undefined) { query += ' AND is_done = ?'; params.push(is_done === 'true' ? 1 : 0); }

    query += ' ORDER BY created_at DESC';

    const [tasks] = await db.query(query, params);
    return res.json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

// GET /api/tasks/:id (get des tasks selectionnées )
export const getTask = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Tâche introuvable' });
    return res.json(rows[0]);
  } catch {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /api/tasks (creation des tasks)
export const createTask = async (req, res) => {
  const { id: userId } = req.user;
  const { title, description, priority, tag, category } = req.body;

  if (!title) return res.status(400).json({ error: 'Le titre est requis' });

  try {
    const [result] = await db.query(
      'INSERT INTO tasks (user_id, title, description, priority, tag, category) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, title, description ?? null, priority ?? 'medium', tag ?? null, category ?? 'semaine']
    );
    const [newTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    return res.status(201).json(newTask[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

// PUT /api/tasks/:id (misa à jour des tasks)
export const updateTask = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const { title, description, priority, tag, category, is_done } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Tâche introuvable' });

    const t = rows[0];
    await db.query(
      'UPDATE tasks SET title=?, description=?, priority=?, tag=?, category=?, is_done=? WHERE id=? AND user_id=?',
      [
        title ?? t.title,
        description ?? t.description,
        priority ?? t.priority,
        tag ?? t.tag,
        category ?? t.category,
        is_done !== undefined ? is_done : t.is_done,
        id, userId,
      ]
    );
    const [updated] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return res.json(updated[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

// PATCH /api/tasks/:id/toggle (interraction pour le is_done)
export const toggleTask = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT is_done FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Tâche introuvable' });

    const newStatus = !rows[0].is_done;
    await db.query(
      'UPDATE tasks SET is_done = ? WHERE id = ? AND user_id = ?',
      [newStatus, id, userId]
    );
    return res.json({ id: parseInt(id), is_done: newStatus });
  } catch {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT id FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Tâche introuvable' });

    await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId]);
    return res.json({ message: 'Tâche supprimée' });
  } catch {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};
