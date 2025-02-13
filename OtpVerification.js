// src/components/OtpVerification.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For React
// import { useNavigation } from '@react-navigation/native'; // For React Native

const OtpVerification = ({ mobileNumber, isJobSeeker }) => {  // Receive props
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For React
  // const navigation = useNavigation(); // For React Native

  const handleContinueClick = async () => {
    setError('');

    if (!otp) {
      setError('OTP is required.');
      return;
    }

    try {
      const response = await axios.post('/api/verify-otp', { mobileNumber, otp });
      console.log(response.data.message);

      localStorage.setItem('isJobSeeker', isJobSeeker); // Or use your state management

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
      <h2>Enter OTP</h2>
      <input
        type="text"
        placeholder="Enter Otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleContinueClick}>Continue</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default OtpVerification;