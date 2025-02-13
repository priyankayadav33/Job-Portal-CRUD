// server/routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const Application = require('../models/Application'); // Import your Application model

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

// Middleware to authenticate job seekers
const authenticateJobSeeker = (req, res, next) => {
    // Your authentication logic here (e.g., check JWT token and user role)
    // Example (replace with your actual auth):
    // if (req.user && req.user.isJobSeeker) {
    //   next(); // Allow access if authenticated as a job seeker
    // } else {
    //   res.status(401).json({ error: 'Unauthorized' });
    // }
    next(); // REMOVE THIS FOR PRODUCTION - it bypasses authentication
  };


// POST /api/applications (Create a new application) - Requires job seeker authentication
router.post('/', authenticateJobSeeker, async (req, res) => {
  try {
    const application = new Application(req.body);

    // Ensure the jobSeeker ID is set correctly (from the authenticated user)
    application.jobSeeker = req.user._id; // Assuming req.user._id is the job seeker's ID

    await application.save();
    res.status(201).json(application); // 201 Created
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/applications (Get all applications) - Requires recruiter authentication
router.get('/', authenticateRecruiter, async (req, res) => {
  try {
    const applications = await Application.find().populate('jobSeeker').populate('job'); // Populate jobSeeker and job details
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/applications/:id (Get a specific application) - Requires recruiter or job seeker authentication
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('jobSeeker').populate('job');
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE /api/applications/:id (Delete an application) - Requires recruiter or job seeker authentication
router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.status(204).end(); // 204 No Content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;