// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated for v6
import LandingPage from './components/LandingPage.js';
import Login from './components/Login.js';
import Signup from './components/Signup';
// import ForgotPassword from './components/Auth/ForgotPassword.js';
import ProfileSetup from './components/ProfileSetup.js';
import Dashboard from './components/Dashboard.js';
// import PublicProfile from './components/Public/PublicProfile.js';
// import Analytics from './components/Analytics/Analytics.js';
// Note: Remove or update the import for './styles/index.css' if it’s not needed or misplaced
// import './styles/index.css'; // Comment out or fix if this file doesn’t exist

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        {/* <Route path="/:username" element={<PublicProfile />} /> */}
      </Routes>
  );
}

export default App;