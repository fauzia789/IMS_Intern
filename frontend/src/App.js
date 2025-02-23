import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RolePage from './pages/RolePage';
import InternshipList from './pages/InternshipList';
import AddApplicant from './pages/AddApplicant';
import './index.css'; // Import global styles

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/role/:role" element={<RolePage />} />
        <Route path="/internship-list" element={<InternshipList />} />
        <Route path="/add-applicant" element={<AddApplicant />} />
      </Routes>
    </Router>
  );
};

export default App;
