import React from 'react'; // Import the React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM client for rendering React components to the DOM
import App from './App'; // Import the main App component

// Create a React root to manage the DOM for the application.
// This is the entry point for rendering the React application into the HTML element with id 'root'.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root.
// React.StrictMode is a tool for highlighting potential problems in an application.
// It activates additional checks and warnings for its descendants.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 