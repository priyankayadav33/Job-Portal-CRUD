// src/components/JobSeekerDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobSeekerDashboard = () => {
  const [jobSeeker, setJobSeeker] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobSeekerData = async () => {
      try {
        // Get the user's role (job seeker/provider) - you'll need to store this during login
        const isJobSeeker = localStorage.getItem('isJobSeeker') === 'true'; // Get from localStorage

        if (isJobSeeker) { // Only fetch if it's a job seeker
          // Fetch job seeker profile (replace with your actual API endpoint)
          const jobSeekerResponse = await axios.get('/api/job-seekers/me'); // Or /api/job-seekers/:id, if you have user ID

          setJobSeeker(jobSeekerResponse.data);
        }

      } catch (err) {
        setError(err.response?.data?.error || err.message);
        console.error("Error fetching job seeker data:", err);
      }
    };

    const fetchJobs = async () => {
      try {
        const jobsResponse = await axios.get('/api/jobs'); // Fetch all jobs (or with filters)
        setJobs(jobsResponse.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobSeekerData();
    fetchJobs(); // Fetch jobs on mount as well
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleApplyJob = async (jobId) => {
    try {
        const isJobSeeker = localStorage.getItem('isJobSeeker') === 'true';

        if (isJobSeeker) {
            await axios.post('/api/applications', {
                jobSeeker: jobSeeker._id, // Assuming jobSeeker has an _id
                job: jobId
            });
            alert('Job applied successfully!');
        }
    } catch (error) {
        setError(error.response?.data?.error || error.message);
        console.error("Error applying for job:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!jobSeeker) {
    return <div>Loading...</div>; // Show a loading message while data is fetching
  }

  return (
    <div>
      <h2>Job Seeker Dashboard</h2>

      <h3>Your Profile</h3>
      {jobSeeker && ( // Conditionally render if jobSeeker data is available
        <div>
          <p>Name: {jobSeeker.name}</p>
          {/* ... other profile details */}
        </div>
      )}

      <h3>Available Jobs</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}> {/* Important: Add a unique key for each list item */}
            <h4>{job.jobTitle}</h4>
            <p>Skills: {job.skills.join(', ')}</p>
            {/* ... other job details */}
            <button onClick={() => handleApplyJob(job._id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSeekerDashboard;