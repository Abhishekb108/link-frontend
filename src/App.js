// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated for v6
import LandingPage from './components/LandingPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import ProfileSetup from './components/ProfileSetup';
import Dashboard from './components/Dashboard/Dashboard';
import PublicProfile from './components/Public/PublicProfile';
import Analytics from './components/Analytics/Analytics';
// Note: Remove or update the import for './styles/index.css' if it’s not needed or misplaced
// import './styles/index.css'; // Comment out or fix if this file doesn’t exist

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/:username" element={<PublicProfile />} />
      </Routes>
    </Router>
  );
}

export default App;