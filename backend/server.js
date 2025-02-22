// Backend: server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/internshipDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const applicantSchema = new mongoose.Schema({
    name: String,
    role: String,
    status: String,
    applicationDate: { type: Date, default: Date.now },
});

const Applicant = mongoose.model('Applicant', applicantSchema);

app.get('/applicants', async (req, res) => {
    const { name, status } = req.query;
    const filter = {};
    if (name) filter.name = new RegExp(name, 'i');
    if (status) filter.status = status;
    const applicants = await Applicant.find(filter);
    res.json(applicants);
});

app.post('/applicants', async (req, res) => {
    const newApplicant = new Applicant(req.body);
    await newApplicant.save();
    res.json(newApplicant);
});

app.delete('/applicants/:id', async (req, res) => {
    await Applicant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Applicant removed' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));