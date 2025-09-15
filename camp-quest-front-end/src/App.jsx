// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { RentalList } from './pages/RentalList/RentalList';
import { RentalProvider } from './context/RentalContext';
import './index.css';

function App() {
  return (
    <RentalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rental-list" element={<RentalList />} />
        </Routes>
      </Router>
    </RentalProvider>
  );
}

export default App;