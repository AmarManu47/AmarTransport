// quick node script to create admin (save as createAdmin.js in backend)
const pool = require('./db');
const bcrypt = require('bcryptjs');

async function run(){
  const hashed = await bcrypt.hash('admin123', 10);
  const [r] = await pool.query('INSERT INTO users (name,email,password,role) VALUES (?, ?, ?, ?)', ['Admin','admin@amar.com',hashed,'admin']);
  console.log('admin id', r.insertId);
  process.exit();
}
run();
