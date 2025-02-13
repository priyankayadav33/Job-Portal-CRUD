// src/components/JobProviderDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobProviderDashboard = () => {
  const [recruiter, setRecruiter] = useState(null);
  const [jobs, setJobs] = useState();
  const [applications, setApplications] = useState(); // New state for applications
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecruiterData = async () => {
      try {
        const isJobSeeker = localStorage.getItem('isJobSeeker') === 'false'; // Check if it's a recruiter
        if (isJobSeeker) {
          const recruiterResponse = await axios.get('/api/job-providers/me'); // Or /api/job-providers/:id
          setRecruiter(recruiterResponse.data);
        }
      } catch (err) {
        setError(err.response?.data?.error || err.message);
        console.error("Error fetching recruiter data:", err);
      }
    };

    const fetchJobs = async () => {
      try {
        const jobsResponse = await axios.get('/api/jobs'); // Fetch all jobs (or with filters)
        setJobs(jobsResponse.data.filter(job => job.recruiter._id === recruiter._id)); // Filter jobs by recruiter

      } catch (err) {
        setError(err.response?.data?.error || err.message);
        console.error("Error fetching jobs:", err);
      }
    };

    const fetchApplications = async () => {
      try {
        const applicationsResponse = await axios.get('/api/applications');
        setApplications(applicationsResponse.data.filter(application => {
          const job = jobs.find(j => j._id === application.job._id);
          return job && job.recruiter._id === recruiter._id;
        }));
      } catch (err) {
        setError(err.response?.data?.error || err.message);
        console.error("Error fetching applications:", err);
      }
    };

    fetchRecruiterData(); // Fetch recruiter data
  },); // Empty dependency array for on-mount effect

  useEffect(() => {
      if (recruiter) {
          fetchJobs(); // Fetch jobs after recruiter data is available
      }
  }, [recruiter]);

  useEffect(() => {
    if (jobs.length > 0) {
      fetchApplications(); // Fetch applications after jobs data is available
    }
  }, [jobs]);


  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`/api/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id!== jobId)); // Update job list in state
      alert('Job deleted successfully!');
    } catch (err) {
      setError(err.response?.