import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InternshipList from './pages/InternshipList';
import AddApplicant from './pages/AddApplicant';
import './styles/globals.css';  // Import global styles

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/internship-list" element={<InternshipList />} />
        <Route path="/add-applicant" element={<AddApplicant />} />
      </Routes>
    </Router>
  );
};

export default App;
