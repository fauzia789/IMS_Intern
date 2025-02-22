import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { getApplicantsByRole } from '../services/applicantService';

const Dashboard = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    const data = await getApplicantsByRole();
    setApplicants(data);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-6">Internship Applicants Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        {['Web Application Trainee', 'UI/UX Designer Trainee', 'Sales/Marketing Trainee'].map((role) => (
          <Card key={role} role={role} applicants={applicants} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
