// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import JobSeekerDashboard from './components/JobSeekerDashboard';
import JobProviderDashboard from './components/JobProviderDashboard';
import OtpVerification from './components/OtpVerification'; // Import OTP verification component
import Profile from './components/Profile'; // Import Profile component
import JobList from './components/JobList'; // Import JobList component
import ApplicationList from './components/ApplicationList'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to /login */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/otp" element={<OtpVerification />} /> {/* Route for OTP verification */}

        {/* Job Seeker Routes */}
        <Route path="/job-seeker-dashboard" element={<JobSeekerDashboard />} />
        <Route path="/profile" element={<Profile />} /> {/* Profile route */}
        <Route path="/jobs" element={<JobList />} /> {/* Jobs route */}
        <Route path="/applications" element={<ApplicationList />} /> {/* ApplicationList route */}


        {/* Job Provider Routes */}
        <Route path="/job-provider-dashboard" element={<JobProviderDashboard />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;