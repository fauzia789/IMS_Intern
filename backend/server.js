const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, mongoDBURL } = require('./config'); // Use require to import from config.js
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(mongoDBURL)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, required: true },
  applicationDate: { type: Date, default: Date.now },
});

const Applicant = mongoose.model('Applicant', applicantSchema);

// Get applicants with optional filters
app.get('/applicants', async (req, res) => {
  const { name, status } = req.query;
  const filter = {};

  if (name) filter.name = new RegExp(name, 'i');
  if (status) filter.status = status;

  try {
    const applicants = await Applicant.find(filter);
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching applicants' });
  }
});

// Add new applicant
app.post('/applicants', async (req, res) => {
  const { name, role, status, applicationDate } = req.body;

  // Validate input
  if (!name || !role || !status) {
    return res.status(400).json({ error: 'All fields (name, role, status) are required' });
  }

  const newApplicant = new Applicant({ name, role, status, applicationDate });

  try {
    await newApplicant.save();
    res.json(newApplicant);
  } catch (err) {
    res.status(500).json({ error: 'Error adding applicant' });
  }
});

// Remove applicant by ID
app.delete('/applicants/:id', async (req, res) => {
  try {
    await Applicant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Applicant removed' });
  } catch (err) {
    res.status(500).json({ error: 'Error removing applicant' });
  }
});

// update
app.put('/applicants/:id', async (req, res) => {
  try {
    const { applicationDate, status } = req.body;
    const updatedApplicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      { applicationDate, status },
      { new: true }
    );
    res.json(updatedApplicant);
  } catch (err) {
    res.status(500).json({ error: 'Error updating applicant' });
  }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
