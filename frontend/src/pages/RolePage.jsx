import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RolePage = () => {
  const { role } = useParams();
  const decodedRole = decodeURIComponent(role);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newApplicant, setNewApplicant] = useState({ name: '', applicationDate: '', status: '' });
  const [updateApplicant, setUpdateApplicant] = useState({ id: '', applicationDate: '', status: '' });

  useEffect(() => {
    fetchApplicants();
  }, [decodedRole]);

  const fetchApplicants = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5555/applicants', { params: { role: decodedRole } });
      setApplicants(response.data);
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
      setShowModal(false);
      setNewApplicant({ name: '', applicationDate: '', status: '' });
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
    setUpdateApplicant({ id: applicant._id, applicationDate: applicant.applicationDate.split('T')[0], status: applicant.status });
    setShowUpdateModal(true);
  };

  const handleUpdateApplicant = async () => {
    if (!updateApplicant.applicationDate || !updateApplicant.status) {
      alert('Please select status and date.');
      return;
    }
    try {
      await axios.put(`http://localhost:5555/applicants/${updateApplicant.id}`, updateApplicant);
      fetchApplicants();
      setShowUpdateModal(false);
    } catch (err) {
      alert('Error updating applicant.');
    }
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
              {applicants.map((applicant) => (
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
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Applicant Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Update Applicant</h2>
            <input
              type="date"
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white mb-3"
              value={updateApplicant.applicationDate}
              onChange={(e) => setUpdateApplicant({ ...updateApplicant, applicationDate: e.target.value })}
            />
            <select
              className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white mb-3"
              value={updateApplicant.status}
              onChange={(e) => setUpdateApplicant({ ...updateApplicant, status: e.target.value })}
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
                onClick={handleUpdateApplicant}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
                onClick={() => setShowUpdateModal(false)}
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
