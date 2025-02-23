import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleRoleClick = (role) => {
    navigate(`/role/${encodeURIComponent(role)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-semibold mb-4 text-center">
        Internship Applicants Dashboard
      </h1>
      <p className="text-lg text-gray-300 mb-8 text-center">
        Click on a role to see applicants' status.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {['Web Application Trainee', 'UI/UX Designer Trainee', 'Sales/Marketing Trainee'].map((role) => (
          <button
            key={role}
            className="p-4 bg-gray-800 rounded-lg text-xl shadow-lg hover:bg-gray-700 transition duration-200 text-center"
            onClick={() => handleRoleClick(role)}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
