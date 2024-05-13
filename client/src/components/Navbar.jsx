import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import logo from '../../public/noexpirylogo.ico'
import AuthGoogle from './AuthGoogle';
import SignOut from './SignOut';
import { auth } from '../firebase';

const Navbar = () => {
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        // Listen for changes in authentication state
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });

        // Clean up function
        return () => unsubscribe();
    }, []); // Empty dependency array to run once on mount

    return (
      <AppBar position="fixed" sx={{ width: '100%', background: "#171111" }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link to={userEmail ? "/home": "/" } style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={logo} alt="NoExpiry" style={{ height: '50px' }} />
          </Link>
          <div>
            {userEmail && (<SignOut />)}
            {!userEmail && (<AuthGoogle />)}
          </div>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;