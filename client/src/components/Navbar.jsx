import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import logo from '../../public/noexpirylogo.ico'
import AuthGoogle from './AuthGoogle';
import SignOut from './SignOut';
import { auth } from '../firebase';

const Navbar = ({ navHeight }) => {
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
        <AppBar position="fixed" sx={{ width: '100%', background: "#171111", height: navHeight }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Link to={userEmail ? "/home" : "/"} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <img src={logo} alt="NoExpiry" style={{ height: navHeight }} />
                        <h3>NoExpiry</h3>
                    </Stack>
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