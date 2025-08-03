const express = require('express'); // Import the Express.js framework for building web applications
const mysql = require('mysql2');     // Import the mysql2 library to interact with MySQL database

const app = express(); // Create an Express application instance
const port = process.env.PORT || 5000; // Define the port the server will listen on. Uses environment variable PORT or defaults to 5000.

app.use(express.json()); // Enable Express to parse JSON formatted request bodies

// MySQL Connection Pool
// Create a connection pool to manage multiple connections to the MySQL database efficiently.
// 'database' is the service name defined in docker-compose.yml, which resolves to the database container's IP within the Docker network.
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'database', // Database host (Docker service name or environment variable)
  user: process.env.MYSQL_USER || 'user',     // Database user
  password: process.env.MYSQL_PASSWORD || 'password', // Database password
  database: process.env.MYSQL_DATABASE || 'mydatabase', // Name of the database to connect to
  waitForConnections: true, // Whether the pool should wait for connections to be available
  connectionLimit: 10,      // Maximum number of connections in the pool
  queueLimit: 0             // Maximum number of requests the pool will queue before returning an error
});

// Test DB connection
// Attempt to get a connection from the pool to verify database connectivity on server startup.
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
  connection.release(); // Release the connection back to the pool immediately after testing
});

// Basic API endpoint
// Defines a GET request handler for the root path ('/').
// This sends a simple string response to confirm the server is running.
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Example: Get users
// Defines a GET request handler for the '/users' path.
// It queries the 'users' table in the database and returns the results as JSON.
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Error fetching users'); // Send a 500 error if query fails
      return;
    }
    res.json(results); // Send the query results as a JSON array
  });
});

// Start the server and listen for incoming requests on the defined port.
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 