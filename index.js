// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot
import App from './App'; // Import your main App component
import './index.css'; // Import any global CSS (optional)

// Get the root element from the HTML
const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot

// Render the App component inside the root
root.render(
  <React.StrictMode> {/* Wrap with StrictMode for development checks (optional) */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();