// backend/routes/bookings.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/authMiddleware');

// create booking
router.post('/', auth, async (req,res) => {
  const { vehicle_id, pickup_location, drop_location, date, amount } = req.body;
  const userId = req.user.id;
  try {
    const [result] = await pool.query(
      `INSERT INTO bookings (user_id, vehicle_id, pickup_location, drop_location, date, amount)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, vehicle_id, pickup_location, drop_location, date || null, amount || 0]
    );
    const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [result.insertId]);
    res.json(rows[0]);
  } catch(err) { console.error(err); res.status(500).json({message:'Server error'}); }
});

// list bookings for user
router.get('/', auth, async (req,res) => {
  try {
    const user = req.user;
    if (user.role === 'admin') {
      const [rows] = await pool.query('SELECT * FROM bookings ORDER BY created_at DESC');
      return res.json(rows);
    }
    const [rows] = await pool.query('SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC', [user.id]);
    res.json(rows);
  } catch(err){ console.error(err); res.status(500).json({message:'Server error'}); }
});

module.exports = router;
