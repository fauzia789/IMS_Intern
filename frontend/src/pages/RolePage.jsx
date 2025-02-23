import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RolePage = () => {
  const { role } = useParams();
  const decodedRole = decodeURIComponent(role);
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [newApplicant, setNewApplicant] = useState({ name: '', applicationDate: '', status: '' });
  const [updateApplicant, setUpdateApplicant] = useState({ id: '', applicationDate: '', status: '' });
  const [showModal, setShowModal] = useState(false); // Added state for modal visibility

  useEffect(() => {
    fetchApplicants();
  }, [decodedRole]);

  useEffect(() => {
    if (statusFilter) {
      setFilteredApplicants(applicants.filter((applicant) => applicant.status === statusFilter));
    } else {
      setFilteredApplicants(applicants);
    }
  }, [statusFilter, applicants]);

  const fetchApplicants = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5555/applicants', { params: { role: decodedRole } });
      setApplicants(response.data);
      setFilteredApplicants(response.data); // Initially show all applicants
    } catch (err) {
      setError('Error fetching applicants. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddApplicant = async () => {
    if (!newApplicant.name || !newApplicant.applicationDate || !newApplicant.status) {
      alert('Please fill all fields.');
      return;
    }
    try {
      await axios.post('http://localhost:5555/applicants', { ...newApplicant, role: decodedRole });
      fetchApplicants();
      setNewApplicant({ name: '', applicationDate: '', status: '' });
      setShowModal(false); // Close the modal after adding an applicant
    } catch (err) {
      alert('Error adding applicant. Try again.');
    }
  };

  const handleRemoveApplicant = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/applicants/${id}`);
      fetchApplicants();
    } catch (err) {
      alert('Error deleting applicant.');
    }
  };

  const openUpdateModal = (applicant) => {
    setUpdateApplicant(applicant);
    setShowModal(true); // Open the modal when updating an applicant
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6">
      <h1 className="text-4xl font-semibold text-center mb-8">Applicants for {decodedRole}</h1>

      <button
        className="mb-6 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 transition duration-200"
        onClick={() => setShowModal(true)}
      >
        + Add Applicant
      </button>

      <select
        className="mb-6 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-lg"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">Select Status</option>
        {['New', 'WIP', 'Wait', 'Pass', 'Fail', 'Hire'].map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      {loading ? (
        <div className="text-center text-gray-200">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Application Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant) => (
                <tr key={applicant._id} className="border-b hover:bg-gray-200">
                  <td className="py-3 px-4 text-gray-900">{applicant.name}</td>
                  <td className="py-3 px-4 text-gray-900">{new Date(applicant.applicationDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-gray-900">{applicant.status}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                      onClick={() => openUpdateModal(applicant)}
                    >
                      Update
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                      onClick={() => handleRemoveApplicant(applicant._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Applicant Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Add New Applicant</h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white mb-3"
              placeholder="Name"
              value={newApplicant.name}
              onChange={(e) => setNewApplicant({ ...newApplicant, name: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white mb-3"
              value={newApplicant.applicationDate}
              onChange={(e) => setNewApplicant({ ...newApplicant, applicationDate: e.target.value })}
            />
            <select
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white mb-3"
              value={newApplicant.status}
              onChange={(e) => setNewApplicant({ ...newApplicant, status: e.target.value })}
            >
              <option value="">Select Status</option>
              {['New', 'WIP', 'Wait', 'Pass', 'Fail', 'Hire'].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
                onClick={handleAddApplicant}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
                onClick={() => setShowModal(false)} // Close the modal
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePage;
