import React from 'react';

const Card = ({ role, applicants }) => {
  const countStatus = (status) => {
    return applicants.filter(app => app.role === role && app.status === status).length;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
      <h2 className="text-xl font-medium mb-4">{role}</h2>
      <div className="space-y-2">
        {['New', 'WIP', 'Wait', 'Pass', 'Fail', 'Hire'].map((status) => (
          <div key={status} className="flex justify-between w-full">
            <span className="text-gray-700">{status}</span>
            <span className="text-blue-500">{countStatus(status)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
