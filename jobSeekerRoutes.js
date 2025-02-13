// server/routes/jobSeekerRoutes.js
const express = require('express');
const router = express.Router();
const JobSeeker = require('../models/JobSeeker'); // Import your JobSeeker model

// Middleware to authenticate job seekers (example using a hypothetical auth function)
// Replace with your actual authentication middleware
const authenticateJobSeeker = (req, res, next) => {
  // Your authentication logic here (e.g., check JWT token)
  // Example:
  // if (req.user && req.user.isJobSeeker) { 
  //   next(); // Allow access if authenticated as a job seeker
  // } else {
  //   res.status(401).json({ error: 'Unauthorized' });
  // }
  next(); // REMOVE THIS FOR PRODUCTION - it bypasses authentication
};

// POST /api/job-seekers (Register a new job seeker)
router.post('/', async (req, res) => {
  try {
    const jobSeeker = new JobSeeker(req.body);
    await jobSeeker.save();
    res.status(201).json(jobSeeker); // 201 Created
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/job-seekers (Get all job seekers - for admin or internal use)
router.get('/', async (req, res) => {
  try {
    const jobSeekers = await JobSeeker.find();
    res.json(jobSeekers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/job-seekers/me (Get the current job seeker's profile) - Requires authentication
router.get('/me', authenticateJobSeeker, async (req, res) => {
  try {
    // Assuming your authentication middleware adds the user object to the request
    const jobSeeker = await JobSeeker.findById(req.user._id); // Or req.user.id, depending on your setup
    if (!jobSeeker) {
      return res.status(404).json({ error: 'Job seeker not found' });
    }
    res.json(jobSeeker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/job-seekers/:id (Get a specific job seeker's profile - for recruiters or admin)
router.get('/:id', async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findById(req.params.id);
    if (!jobSeeker) {
      return res.status(404).json({ error: 'Job seeker not found' });
    }
    res.json(jobSeeker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/job-seekers/:id (Update a job seeker's profile) - Requires authentication
router.put('/:id', authenticateJobSeeker, async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Important: runValidators
    if (!jobSeeker) {
      return res.status(404).json({ error: 'Job seeker not found' });
    }
    res.json(jobSeeker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/job-seekers/:id (Delete a job seeker's profile) - Requires authentication (or admin access)
router.delete('/:id', authenticateJobSeeker, async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findByIdAndDelete(req.params.id);
    if (!jobSeeker) {
      return res.status(404).json({ error: 'Job seeker not found' });
    }
    res.status(204).end(); // 204 No Content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;