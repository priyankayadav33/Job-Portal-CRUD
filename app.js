// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // For React
// import { NavigationContainer } from '@react-navigation/native'; // For React Native
// import { createNativeStackNavigator } from '@react-navigation/native-stack'; // For React Native
import LoginScreen from './components/LoginScreen';
import JobSeekerDashboard from './components/JobSeekerDashboard';
import JobProviderDashboard from './components/JobProviderDashboard';
import OtpVerification from './components/OtpVerification'; // Import OTP verification component

const App = () => {
  // const Stack = createNativeStackNavigator(); // For React Native

  return (
    <Router> {/* Use BrowserRouter for React */}
      {/* <NavigationContainer>  Use NavigationContainer for React Native */}
      {/* <Stack.Navigator>  Use Stack.Navigator for React Native */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to /login */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/otp" element={<OtpVerification />} /> {/* Route for OTP verification */}
        <Route path="/job-seeker-dashboard" element={<JobSeekerDashboard />} />
        <Route path="/job-provider-dashboard" element={<JobProviderDashboard />} />
        {/* Add more routes as needed */}
      </Routes>
      {/* </Stack.Navigator> For React Native */}
      {/* </NavigationContainer> For React Native */}
    </Router>
  );
};

export default App;