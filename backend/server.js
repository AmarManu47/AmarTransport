// backend/server.js
const express = require('express');
// const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const vehiclesRoutes = require('./routes/vehicles');
const bookingsRoutes = require('./routes/bookings');
const quotesRoutes = require('./routes/quotes');

const app = express();
// app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/quotes', quotesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
