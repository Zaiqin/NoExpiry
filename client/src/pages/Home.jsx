import React, { useState } from 'react';
import { Typography } from '@mui/material'
import { useEffect } from 'react'
import Display from '../components/Display'
import Form from '../components/Form'
import { Button, Container, Stack } from '@mui/material';

const Home = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newSubmission, setNewSubmission] = useState(false)

    const handleSubmit = () => {
        setIsFormOpen(false);
        setNewSubmission(true)
    };

    // Dialog functions to open and close
    const handleOpenForm = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    return (
        <div>
            <Typography sx={{ fontSize: 30 }}>Welcome back! Here are your items:</Typography>
            <br />
            <Form open={isFormOpen} onClose={handleCloseForm} onSubmit={handleSubmit} />
            <Display submit={newSubmission} setSubmit={setNewSubmission} />
            <Container sx={{ textAlign: 'left', mt: 2, mb: 5, minWidth: "100%" }}>
                <Stack direction="row" spacing={2}>
                    <Button sx={{ boxShadow: 1 }} onClick={handleOpenForm} variant="contained" color="primary">Add New Item</Button>
                </Stack>
            </Container>
        </div>
    )
}

export default Home;
