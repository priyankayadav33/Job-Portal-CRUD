// server/routes/recruiterRoutes.js
const express = require('express');
const router = express.Router();
const Recruiter = require('../models/Recruiter'); // Import your Recruiter model

// Middleware to authenticate recruiters (example using a hypothetical auth function)
// Replace with your actual authentication middleware (e.g., JWT)
const authenticateRecruiter = (req, res, next) => {
  // Your authentication logic here (e.g., check JWT token)
  // Example (replace with your actual auth):
  // if (req.user && req.user.isRecruiter) {
  //   next(); // Allow access if authenticated as a recruiter
  // } else {
  //   res.status(401).json({ error: 'Unauthorized' });
  // }
  next(); // REMOVE THIS FOR PRODUCTION - it bypasses authentication
};


// POST /api/job-providers (Register a new recruiter)
router.post('/', async (req, res) => {
  try {
    const recruiter = new Recruiter(req.body);
    await recruiter.save();
    res.status(201).json(recruiter); // 201 Created
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/job-providers (Get all recruiters - for admin or internal use)
router.get('/', async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.json(recruiters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/job-providers/me (Get the current recruiter's profile) - Requires authentication
router.get('/me', authenticateRecruiter, async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user._id); // Or req.user.id, depending on your setup
    if (!recruiter) {
      return res.status(404).json({ error: 'Recruiter not found' });
    }
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/job-providers/:id (Get a specific recruiter's profile - for admin or internal use)
router.get('/:id', async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ error: 'Recruiter not found' });
    }
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/job-providers/:id (Update a recruiter's profile) - Requires authentication
router.put('/:id', authenticateRecruiter, async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Important: runValidators
    if (!recruiter) {
      return res.status(404).json({ error: 'Recruiter not found' });
    }
    res.json(recruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/job-providers/:id (Delete a recruiter's profile) - Requires authentication (or admin access)
router.delete('/:id', authenticateRecruiter, async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndDelete(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ error: 'Recruiter not found' });
    }
    res.status(204).end(); // 204 No Content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;