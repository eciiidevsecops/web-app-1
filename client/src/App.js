import React, { useState, useEffect } from 'react'; // Import React, useState for state management, and useEffect for side effects

function App() {
  // State variable to store the message fetched from the server
  const [message, setMessage] = useState('');
  // State variable to store the list of users fetched from the server
  const [users, setUsers] = useState([]);

  // useEffect hook runs side effects (like data fetching) after render.
  // The empty dependency array `[]` ensures this effect runs only once after the initial render.
  useEffect(() => {
    // Fetch a simple message from the backend server at http://localhost:5000/
    fetch('http://localhost:5000/')
      .then(res => res.text()) // Parse the response as plain text
      .then(data => setMessage(data)) // Update the 'message' state with the fetched data
      .catch(err => console.error('Error fetching message:', err)); // Log any errors during fetch

    // Fetch the list of users from the backend server at http://localhost:5000/users
    fetch('http://localhost:5000/users')
      .then(res => res.json()) // Parse the response as JSON
      .then(data => setUsers(data)) // Update the 'users' state with the fetched data
      .catch(err => console.error('Error fetching users:', err)); // Log any errors during fetch
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>3-Tier Application</h1>
        {/* Display the message fetched from the server */}
        <p>Server Message: {message}</p>
        <h2>Users:</h2>
        {/* Display the list of users fetched from the server */}
        <ul>
          {users.map(user => ( // Iterate over the users array and render each user as a list item
            <li key={user.id}>{user.name} ({user.email})</li> // Use user.id as a unique key for list items
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App; // Export the App component for use in index.js 