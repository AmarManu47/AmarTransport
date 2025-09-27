// backend/routes/vehicles.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');

// get all vehicles
router.get('/', async (req,res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vehicles ORDER BY created_at DESC');
    res.json(rows);
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// create vehicle (protected - admin)
router.post('/', auth, async (req,res) => {
  const user = req.user;
  if (user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { name, vehicle_type, capacity, registration_no } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO vehicles (name, vehicle_type, capacity, registration_no) VALUES (?, ?, ?, ?)',
      [name, vehicle_type, capacity, registration_no]
    );
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE id = ?', [result.insertId]);
    res.json(rows[0]);
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// update & delete similar...
module.exports = router;
