-- Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS mydatabase;

-- Switch to the newly created (or existing) database
USE mydatabase;

-- Create the 'users' table if it doesn't already exist
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each user, auto-increments
    name VARCHAR(255) NOT NULL,        -- User's name, cannot be null
    email VARCHAR(255) NOT NULL UNIQUE -- User's email, cannot be null and must be unique
); 