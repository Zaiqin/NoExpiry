import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
