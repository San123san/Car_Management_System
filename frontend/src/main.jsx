
//main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router and Routes
import './index.css';
import App from './App.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import SignInPage from './components/SignInPage.jsx'; // Add SignInPage import
import YourProductPage from './components/YourProductPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Main app route */}
        <Route path="/" element={<App />} />

        {/* Route for Sign Up page */}
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* Route for Sign In page */}
        <Route path="/sign-in" element={<SignInPage />} />

        <Route path="/your-product" element={<YourProductPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
