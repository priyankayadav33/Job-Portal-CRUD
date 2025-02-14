// backend (Node.js + Express + MongoDB)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000; // or any port you prefer

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/jobportal', { // Replace with your MongoDB connection string
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


app.use(bodyParser.json());

// Schemas (Mongoose)
const jobSeekerSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  experience: Number, // in years
  location: String,
  ctc: Number, // Current or Expected CTC
  noticePeriod: String, // e.g., "1 month", "2 weeks"
});

const recruiterSchema = new mongoose.Schema({
  name: String,
  company: String,
  email: String,
  mobile: String,
});

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  skills: [String],
  experience: Number,
  location: String,
  maxCtc: Number,
  noticePeriod: String,
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' }, // Reference to the recruiter who posted the job
});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
const Recruiter = mongoose.model('Recruiter', recruiterSchema);
const Job = mongoose.model('Job', jobSchema);


// API Endpoints

// Job Seeker APIs
app.post('/api/job-seekers', async (req, res) => {
  try {
    const jobSeeker = new JobSeeker(req.body);
    await jobSeeker.save();
    res.status(201).json(jobSeeker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/job-seekers', async (req, res) => {
  try {
    const jobSeekers = await JobSeeker.find();
    res.json(jobSeekers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/job-seekers/:id', async (req, res) => {
    try {
      const jobSeeker = await JobSeeker.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!jobSeeker) {
        return res.status(404).json({ message: 'Job seeker not found' });
      }
      res.json(jobSeeker);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.delete('/api/job-seekers/:id', async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findByIdAndDelete(req.params.id);
    if (!jobSeeker) {
      return res.status(404).json({ message: 'Job seeker not found' });
    }
    res.status(204).end(); // 204 No Content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Recruiter APIs (Similar structure as Job Seeker APIs)

app.post('/api/job-providers', async (req, res) => { /* ... */ });
app.get('/api/job-providers', async (req, res) => { /* ... */ });
app.put('/api/job-providers/:id', async (req, res) => { /* ... */ });
app.delete('/api/job-providers/:id', async (req, res) => { /* ... */ });



// Job APIs
app.post('/api/jobs', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/jobs', async (req, res) => {
    try {
      const jobs = await Job.find().populate('recruiter'); // Populate the recruiter details
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.put('/api/jobs/:id', async (req, res) => { /* ... */ });
app.delete('/api/jobs/:id', async (req, res) => { /* ... */ });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});