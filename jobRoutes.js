// server/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Import your Job model

// Middleware to authenticate recruiters (example using a hypothetical auth function)
// Replace with your actual authentication middleware (e.g., JWT)
const authenticateRecruiter = (req, res, next) => {
  // Your authentication logic here (e.g., check JWT token and user role)
  // Example (replace with your actual auth):
  // if (req.user && req.user.isRecruiter) {
  //   next(); // Allow access if authenticated as a recruiter
  // } else {
  //   res.status(401).json({ error: 'Unauthorized' });
  // }
  next(); // REMOVE THIS FOR PRODUCTION - it bypasses authentication
};

// POST /api/jobs (Create a new job posting) - Requires recruiter authentication
router.post('/', authenticateRecruiter, async (req, res) => {
  try {
    const job = new Job(req.body);

    // Ensure the recruiter ID is set correctly (from the authenticated user)
    job.recruiter = req.user._id; // Assuming req.user._id is the recruiter's ID

    await job.save();
    res.status(201).json(job); // 201 Created
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/jobs (Get all job postings) - No authentication required (usually)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('recruiter'); // Populate recruiter details
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/jobs/:id (Get a specific job posting)
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('recruiter');
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/jobs/:id (Update a job posting) - Requires recruiter authentication
router.put('/:id', authenticateRecruiter, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Important: runValidators
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/jobs/:id (Delete a job posting) - Requires recruiter authentication
router.delete('/:id', authenticateRecruiter, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(204).end(); // 204 No Content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;