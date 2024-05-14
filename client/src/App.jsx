import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { ProtectedRoute } from './components/protectedRoute';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const navHeight = "70px";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setIsFetching(false)
        return
      }
      setUser(null)
      setIsFetching(false)
    });
    return () => unsubscribe();
  }, [])

  if (isFetching) {
    return <h2>Loading...</h2>
  }

  return (
    <BrowserRouter>
      <div style={{ paddingTop: navHeight }}> {/* Add padding top for the navbar */}
        <Navbar navHeight={navHeight}/>
        <Routes>
          <Route path="/home" element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/" element={<LandingPage user={user}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
