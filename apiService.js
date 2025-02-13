// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'; // Default to localhost if env variable is not set

const apiService = {
  // Authentication
  sendOtp: async (mobileNumber) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/send-otp`, { mobileNumber });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message; // Re-throw the error for the component to handle
    }
  },

  verifyOtp: async (mobileNumber, otp) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp`, { mobileNumber, otp });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message;
    }
  },

  // Job Seeker
  getJobSeekerProfile: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/job-seekers/me`); // Or /api/job-seekers/:id, add JWT in headers
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message;
    }
  },

  updateJobSeekerProfile: async (profileData) => {  // Example
    try {
      const response = await axios.put(`${API_BASE_URL}/job-seekers/:id`, profileData); // Add JWT in headers
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message;
    }
  },

  // Recruiter
  getRecruiterProfile: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/job-providers/me`); // Add JWT in headers
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message;
    }
  },

    // Jobs
    getJobs: async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/jobs`);
          return response.data;
        } catch (error) {
          throw error.response?.data?.error || error.message;
        }
      },
    
      deleteJob: async (jobId) => {
        try {
          const response = await axios.delete(`${API_BASE_URL}/jobs/${jobId}`);
          return response.data;
        } catch (error) {
          throw error.response?.data?.error || error.message;
        }
      },

  // Applications
  applyForJob: async (jobSeekerId, jobId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/applications`, {
        jobSeeker: jobSeekerId,
        job: jobId,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message;
    }
  },

  getApplications: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message;
    }
  },

  // ... other API calls
};

export default apiService;