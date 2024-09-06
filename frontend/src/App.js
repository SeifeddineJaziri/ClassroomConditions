import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import GoodConditions from './components/GoodConditions'; 
import ClassroomDetail from './components/ClassroomDetail'; 
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
              <Route path="/classroom/:number" element={<ClassroomDetail />} /> 
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
