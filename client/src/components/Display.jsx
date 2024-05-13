import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Container, Stack } from "@mui/material";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Display.css'

const localizer = momentLocalizer(moment);

const Display = ({ submit, setSubmit }) => {
    const [savedData, setSavedData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentView, setCurrentView] = useState(moment().format('M Y')); // Initial value

    // Event handler triggered when the calendar's date range changes
    const handleNavigate = (newDate) => {
        setCurrentView(moment(newDate).format('M Y'));
    };

    // This method fetches the items from the database.
    async function getItems() {
        const response = await fetch(`${process.env.VITE_REACT_APP_SERVER_URI}/api/all`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return [];
        }
        const records = await response.json();
        setSavedData(sortByExpiryDate(records));
    }

    // Fetch data upon load of webpage
    useEffect(() => {
        getItems(); // Fetch items when component mounts
    }, []);

    // Load list again when new submission happens
    useEffect(() => {
        if (submit) {
            getItems().then(() => {
                // set new submission back to false
                setSubmit(false)
            })
        }
    }, [submit]);

    // Function to format date as dd/mm/yy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    // Function to calculate time to expiry
    const calculateTimeToExpiry = (expiryDateString) => {
        const expiryDate = new Date(expiryDateString);
        const currentDate = new Date();
        const timeDiff = expiryDate - currentDate; // Difference in milliseconds
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${days} days, ${hours} hrs`;
    };

    // Function to sort savedData by expiry date
    const sortByExpiryDate = (data) => {
        const sortedData = [...data].sort((a, b) => {
            // Convert date strings to Date objects for comparison
            const dateA = new Date(a.expiryDate);
            const dateB = new Date(b.expiryDate);
            // Compare dates
            return dateA - dateB;
        });
        return sortedData;
    };

    // Convert savedData to events format
    const events = savedData.map(item => ({
        id: item.id,
        title: item.name,
        start: new Date(item.expiryDate),
        end: new Date(item.expiryDate),
    }));

    // Custom style for each day cell
    const getDayProp = (date) => {
        const d = `${date.getMonth() + 1} ${date.getFullYear()}`
        const today = new Date();
        const isToday = date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
        return {
            style: {
                backgroundColor: isToday ? '#588c7e' : d !== currentView ? "dimgray" : "",
                opacity: d !== currentView ? 0.4 : 1
            }
        };
    };

    return (
        <div>
            <Container
                sx={{
                    border: 1,
                    borderColor: "silver",
                    borderRadius: 1,
                    boxShadow: 4,
                    p: 2,
                    minWidth: "100%",
                    overflow: "auto",
                }}
            >
                <Stack direction="row" spacing={3}>
                    <div className="table-container">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: 'white' }}>User</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Item Name</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Expiry Date</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Time to Expiry</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {savedData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ color: 'white' }}>{item.user}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{item.name}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{formatDate(item.expiryDate)}</TableCell>
                                        <TableCell sx={{ color: 'white' }}>{calculateTimeToExpiry(item.expiryDate)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        defaultDate={new Date()}
                        onSelectEvent={(event) => { }}
                        style={{ height: 500, width: '100%', marginTop: "10px" }}
                        views={['month', 'week']}
                        dayPropGetter={getDayProp}
                        onNavigate={handleNavigate}
                    />
                </Stack>
            </Container>
        </div>
    );
};

export default Display;