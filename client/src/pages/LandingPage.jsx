import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Typography, Stack, Box } from '@mui/material';
import AuthGoogle from '../components/AuthGoogle';
import image1 from '../assets/assortment-compost-made-rotten-food-with-copy-space_23-2149073784.jpg';
import image2 from '../assets/top-view-recycling-bin-with-organic-vegetables_23-2148666785.jpg'

const LandingPage = ({ user }) => {
    if (user) {
        return <Navigate to="/home" />;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 2, mb: 5 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Welcome to NoExpiry!
            </Typography>
            <Typography variant="body1" paragraph>
                NoExpiry is designed to help you track the expiry dates of your food items effortlessly. 
                With NoExpiry, you can easily add food items to your inventory and set expiry dates.
            </Typography>
            <Stack direction="row" spacing={4} sx={{ mt: 4, mb: 2 }}>
                {/* First column */}
                <Box>
                    <img src={image1} alt="Food Wastage" style={{ maxWidth: 'auto', height: '15vw', marginBottom: "10px" }} />
                    <Typography variant="body1" paragraph>
                    Research shows that a staggering amount of food ends up in landfills, with expired items from fridges playing a significant role.
                    </Typography>
                </Box>
                {/* Second column */}
                <Box>
                    <img src={image2} alt="Food Wastage" style={{ maxWidth: 'auto', height: '15vw', marginBottom: "10px" }} />
                    <Typography variant="body1" paragraph>
                    Did you know? Studies indicate that reducing food waste at the household level, especially from expired items in fridges, could have a substantial positive impact on the environment.
                    </Typography>
                </Box>
            </Stack>
            <Typography variant="h5" paragraph>
                Say goodbye to wasted food and money with NoExpiry!
            </Typography>
            <AuthGoogle />
        </Container>
    );
};

export default LandingPage;