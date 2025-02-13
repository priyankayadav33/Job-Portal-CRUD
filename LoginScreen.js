// src/components/LoginScreen.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For React
// import { useNavigation } from '@react-navigation/native'; // For React Native

const LoginScreen = () => {
  const [isJobSeeker, setIsJobSeeker] = useState(null); // null initially, then true/false
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For React
  // const navigation = useNavigation(); // For React Native

  const handleRoleSelect = (role) => {
    setIsJobSeeker(role === 'seeker'); // Set true for seeker, false for provider
    navigate('/otp'); // Navigate to the OTP screen
  };

  const handleGetOtpClick = async () => {
    setError(''); // Clear any previous errors

    if (!mobileNumber) {
      setError('Mobile number is required.');
      return;
    }

    try {
      const response = await axios.post('/api/send-otp', { mobileNumber });
      console.log(response.data.message);
      setShowOtpInput(true);
    } catch (err) {
      setError(err.response?.data?.error || err.message); // More robust error handling
      console.error(err);
    }
  };

  const handleContinueClick = async () => {
    setError('');

    if (!otp) {
      setError('OTP is required.');
      return;
    }

    try {
      const response = await axios.post('/api/verify-otp', { mobileNumber, otp });
      console.log(response.data.message);

      // Store user role (isJobSeeker) in local storage or context
      localStorage.setItem('isJobSeeker', isJobSeeker); // Example using localStorage
      // Or use your state management (Redux, Context, etc.)

      if (isJobSeeker) {
        navigate('/job-seeker-dashboard');
      } else {
        navigate('/job-provider-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
      console.error(err);
    }
  };

  return (
    <div>
      {!showOtpInput ? ( // Conditional rendering for Screen 1
        <div>
          <h2>JOB Connector</h2>
          <button onClick={() => handleRoleSelect('seeker')}>JOB SEEKer</button>
          <button onClick={() => handleRoleSelect('provider')}>JOB Provider</button>
        </div>
      ) : ( // Conditional rendering for Screen 2
        <div>
          <h2>Enter Mobile & OTP</h2>
          <input
            type="text"
            placeholder="Enter Mob"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <button onClick={handleGetOtpClick}>Get Otp</button>
          <input
            type="text"
            placeholder="Enter Otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleContinueClick}>Continue</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default LoginScreen;