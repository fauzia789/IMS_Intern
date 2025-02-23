import React, { useState } from 'react';
import axios from 'axios';

const AddApplicant = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const addApplicant = async () => {
    if (!name || !role || !status) {
      setError('All fields are required!');
      return;
    }

    try {
      await axios.post('http://localhost:5555/applicants', {
        name,
        role,
        status,
      });
      alert('Applicant added successfully!');
      setName('');
      setRole('');
      setStatus('');
      setError('');
    } catch (err) {
      setError('Error adding applicant');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Add New Applicant</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          {['Web Application Trainee', 'UI/UX Designer Trainee', 'Sales/Marketing Trainee'].map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <select
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          {['New', 'WIP', 'Wait', 'Pass', 'Fail', 'Hire'].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <button
          className="w-full p-3 bg-blue-500 text-white rounded-md"
          onClick={addApplicant}
        >
          Add Applicant
        </button>
      </div>
    </div>
  );
};

export default AddApplicant;
