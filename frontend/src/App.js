import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RolePage from './pages/RolePage';
import './index.css';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/role/:role" element={<RolePage />} />
      </Routes>
    </Router>
  );
};

export default App;
