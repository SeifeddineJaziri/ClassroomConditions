import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import GoodConditions from './components/GoodConditions';
import BadConditions from './components/BadConditions';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/good-conditions" element={<GoodConditions />} />
              <Route path="/bad-conditions" element={<BadConditions />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
