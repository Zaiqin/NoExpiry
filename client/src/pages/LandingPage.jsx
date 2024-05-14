import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Typography, Stack, Box } from '@mui/material';
import image1 from '../assets/assortment-compost-made-rotten-food-with-copy-space_23-2149073784.jpg';
import image2 from '../assets/top-view-recycling-bin-with-organic-vegetables_23-2148666785.jpg'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#404040',
    padding: theme.spacing(1),
    textAlign: 'center',
    border: "2px white solid",
    borderRadius: "10px",
    height: "25px",
    minWidth: "25px"
  }));

const LandingPage = ({ user }) => {
    if (user) {
        return <Navigate to="/home" />;
    }

    return (
        <Container maxWidth="md" sx={{ mb: 5 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to NoExpiry!
            </Typography>
            <Typography variant="body1" paragraph>
                NoExpiry is designed to help you track the expiry dates of your food items effortlessly. 
                With NoExpiry, you can easily add food items to your inventory and set expiry dates.
            </Typography>
            <Stack direction="row" spacing={4} sx={{ mt: 4, mb: 2 }}>
                {/* First column */}
                <Box sx={{ flex: 1, width: '50%' }}>
                <img src={image1} alt="Food Wastage" style={{ maxWidth: 'auto', height: '15vw', marginBottom: "10px" }} />
                <Typography variant="body1" paragraph>
                    Research shows that a staggering amount of food ends up in landfills, with expired items from fridges playing a significant role.
                </Typography>
                </Box>
                {/* Second column */}
                <Box sx={{ flex: 1, width: '50%' }}>
                <img src={image2} alt="Food Wastage" style={{ maxWidth: 'auto', height: '15vw', marginBottom: "10px" }} />
                <Typography variant="body1" paragraph>
                    Did you know? Studies indicate that reducing food waste at the household level, especially from expired items in fridges, could have a substantial positive impact on the environment.
                </Typography>
                </Box>
            </Stack>
            <Typography variant="h5" paragraph>
                Say goodbye to wasted food and money with NoExpiry!
            </Typography>
            <br />
            <hr />
            <br />
            <Typography variant="p" paragraph>
                NoExpiry was created using the following web technologies:
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1} rowGap={1}>
                    <Grid item xs={2}>
                        <Item>
                            <img src='https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png' width="25px"/>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <img src='https://github-production-user-asset-6210df.s3.amazonaws.com/62091613/261395532-b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35.png' width="25px"/>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <img src='https://user-images.githubusercontent.com/25181517/189716630-fe6c084c-6c66-43af-aa49-64c8aea4a5c2.png' width="25px"/>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <img src='https://user-images.githubusercontent.com/25181517/189716855-2c69ca7a-5149-4647-936d-780610911353.png' width="25px"/>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <img src='https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png' width="25px"/>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <img src='https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png' width="25px"/>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <img src='https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png' width="25px"/>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <img src='https://static-00.iconduck.com/assets.00/vercel-icon-512x449-3422jidz.png' width="25px"/>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <img src='https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png' width="25px"/>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <img src='https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png' width="25px"/>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <img src='https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png' width="25px"/>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <img src='https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png' width="25px"/>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
            <br />
            <Typography variant="p" paragraph>
                Link to Project Github Repository <a href='https://github.com/Zaiqin/NoExpiry' target="_blank">here</a>
            </Typography>
        </Container>
    );
};

export default LandingPage;