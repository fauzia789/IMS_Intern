import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InternshipList = () => {
  const [applicants, setApplicants] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApplicants();
  }, [name, status]);

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5555/applicants', {
        params: { name, status }
      });
      setApplicants(response.data);
    } catch (err) {
      console.error('Error fetching applicants', err);
    } finally {
      setLoading(false);
    }
  };

  // Define the deleteApplicant function
  const deleteApplicant = async (id) => {
    try {
      // Make the delete API request
      await axios.delete(`http://localhost:5555/applicants/${id}`);
      // After successful deletion, remove the applicant from the state
      setApplicants(applicants.filter(applicant => applicant._id !== id));
    } catch (err) {
      console.error('Error deleting applicant', err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Internship Applicants List</h1>

      {/* Filters */}
      <div className="flex space-x-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by Name"
          className="p-2 border border-gray-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All Status</option>
          {['New', 'WIP', 'Wait', 'Pass', 'Fail', 'Hire'].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Application Date</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant._id} className="border-b">
                  <td className="py-2 px-4">{applicant.name}</td>
                  <td className="py-2 px-4">{applicant.role}</td>
                  <td className="py-2 px-4">{applicant.status}</td>
                  <td className="py-2 px-4">{new Date(applicant.applicationDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4">
                    <button className="text-red-500 hover:text-red-700" onClick={() => deleteApplicant(applicant._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InternshipList;
