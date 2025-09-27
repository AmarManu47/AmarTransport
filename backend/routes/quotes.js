// backend/routes/quotes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { body, validationResult } = require('express-validator');

// request a quote
router.post('/request', [
  body('customer_name').notEmpty(),
  body('customer_email').isEmail(),
  body('pickup_location').notEmpty(),
  body('drop_location').notEmpty()
], async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { customer_name, customer_email, pickup_location, drop_location, weight_estimate, preferred_date } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO quotes (customer_name, customer_email, pickup_location, drop_location, weight_estimate, preferred_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [customer_name, customer_email, pickup_location, drop_location, weight_estimate || null, preferred_date || null]
    );
    const [rows] = await pool.query('SELECT * FROM quotes WHERE id = ?', [result.insertId]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req,res) => {
  // optionally protect with auth
  try {
    const [rows] = await pool.query('SELECT * FROM quotes ORDER BY created_at DESC');
    res.json(rows);
  } catch(err){ res.status(500).json({message:'Server error'})}
});

module.exports = router;
