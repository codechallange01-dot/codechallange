const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// GET all coders
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM coders ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new coder
router.post('/', async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const { rows } = await pool.query(
      'INSERT INTO coders (name, message) VALUES ($1, $2) RETURNING *',
      [name, message || 'Hello from the challenge! 👋']
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a coder
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM coders WHERE id = $1', [req.params.id]);
    res.json({ message: 'Coder removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
