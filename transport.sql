-- schema.sql

CREATE DATABASE IF NOT EXISTS amar_transport;
USE amar_transport;

-- Users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','dispatcher','customer') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles / Fleet
CREATE TABLE IF NOT EXISTS vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  vehicle_type VARCHAR(100),
  capacity INT,
  registration_no VARCHAR(100),
  status ENUM('available','on_trip','maintenance') DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotes
CREATE TABLE IF NOT EXISTS quotes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(150),
  customer_email VARCHAR(150),
  pickup_location VARCHAR(255),
  drop_location VARCHAR(255),
  weight_estimate VARCHAR(100),
  preferred_date DATE,
  status ENUM('pending','accepted','rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  vehicle_id INT,
  pickup_location VARCHAR(255),
  drop_location VARCHAR(255),
  date DATETIME,
  status ENUM('pending','confirmed','in_transit','completed','cancelled') DEFAULT 'pending',
  amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
);
