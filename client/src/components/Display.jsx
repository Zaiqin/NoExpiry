import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Container, Stack, Box, IconButton } from "@mui/material";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../Display.css'
import { auth } from '../firebase';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DeleteIcon from '@mui/icons-material/Delete';
import DatePickerPopup from './DatePickerPopup';

const localizer = momentLocalizer(moment);

const Display = ({ submit, setSubmit }) => {
    const [savedData, setSavedData] = useState([]);
    const [currentView, setCurrentView] = useState(moment().format('M Y')); // Initial value
    const [currentEmail, setCurrentEmail] = useState();
    const [editDialogOpen, setEditDialogOpen] = useState(false); // State to control the visibility of the edit dialog
    const [editItemId, setEditItemId] = useState(null); // State to store the ID of the item being edited
    const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State to track window width

    useEffect(() => {
        // Listen for changes in authentication state
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentEmail(user.email);
            } else {
                setCurrentEmail(null);
            }
        });

        // Clean up function
        return () => unsubscribe();
    }, []); // Empty dependency array to run once on mount

    useEffect(() => {
        if (currentEmail) getItems();
    }, [currentEmail])

    useEffect(() => {
        // Function to update window width state
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Event handler triggered when the calendar's date range changes
    const handleNavigate = (newDate) => {
        setCurrentView(moment(newDate).format('M Y'));
    };

    // This method fetches the items from the database.
    async function getItems() {
        const response = await fetch(`${process.env.VITE_REACT_APP_SERVER_URI}/api/get/${currentEmail}`);
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.error(message);
            return [];
        }
        const items = await response.json();
        setSavedData(sortByExpiryDate(items));
    }

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

        if (days < 0 || hours < 0) {
            return `Expired ${(days+1)*-1} days, ${hours*-1} hrs ago`;
        } else {
            return `${days} days, ${hours} hrs`;
        }
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
        end: new Date(item.expiryDate)
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

    // Custom style getter for each event
    const eventStyleGetter = (event, start, end, isSelected) => {
        // Check if the event is expired
        const isExpired = new Date(event.end) < new Date();
        return {
            style: {
                backgroundColor: isExpired ? "#e94949" : "", // Red for expired events, green for others
                borderRadius: "0px",
                border: "none",
                color: "white",
                cursor: "pointer"
            }
        };
    };

    async function editDate(id, newDate) {
        console.log("editing", id, "with new date", newDate)
        try {
            const currentItem = savedData.find(item => item._id === id);
            if (!currentItem) {
                throw new Error('Item not found in savedData');
            }
    
            // Create a new object with the updated expiryDate and all other properties unchanged
            const updatedItem = {
                ...currentItem,
                expiryDate: newDate // Update the expiryDate property
            };
    
            // Make the PUT request with the updated item
            const response = await fetch(`${process.env.VITE_REACT_APP_SERVER_URI}/api/edit/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem)
            });
    
            if (!response.ok) {
                throw new Error(`An error occurred: ${response.statusText}`);
            }
            
            console.log('Item edited successfully');
            getItems();
        } catch (error) {
            console.error('Error editing item:', error.message);
        }
    }  

    // This method deletes the selected item from the database.
    async function deleteItem(id) {
        try {
            const response = await fetch(`${process.env.VITE_REACT_APP_SERVER_URI}/api/delete/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(`An error occurred: ${response.statusText}`);
            }
            console.log('Item deleted successfully');
            setSavedData(savedData => savedData.filter(item => item._id !== id));
            getItems()
        } catch (error) {
            console.error('Error deleting items:', error.message);
        }
    }

    const handleEditClick = (id) => {
        setEditItemId(id);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
    };

    const handleDateSubmit = (date) => {
        if (editItemId) {
            editDate(editItemId, date);
            setEditItemId(null);
            setEditDialogOpen(false);
        }
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
                <Stack direction={windowWidth < 1000? "column": "row"} spacing={3}>
                        <Stack direction="column" spacing={3} sx={{
                            border: 1,
                            borderColor: "silver",
                            borderRadius: 1,
                            boxShadow: 4,
                            p: 2,
                            width: windowWidth < 1000 ? "95%" : "50vw",
                            maxHeight: "55vh",
                            overflow: "auto",
                        }}>
                        <div className="card-container">
                        {savedData.map((item, index) => (
                            <Card
                                key={index}
                                sx={{
                                    borderRadius: 2,
                                    marginBottom: 2,
                                    textAlign: "left",
                                    background: new Date(item.expiryDate) < new Date() ? "lightcoral" : "",
                                }}
                            >
                                <CardContent style={{ paddingBottom: "10px" }}>
                                    <Box sx={{ color: 'text.primary', fontSize: 18, fontWeight: 'bold' }}>{item.name}</Box>
                                    <Box sx={{ color: 'text.secondary', fontSize: 16, fontWeight: 'medium' }}>
                                        Expiry Date: {formatDate(item.expiryDate)}
                                    </Box>
                                    <Box sx={{ color: 'text.secondary', fontSize: 16, fontWeight: 'medium' }}>
                                        {"("}{calculateTimeToExpiry(item.expiryDate)}{")"}
                                    </Box>
                                    <Box sx={{ color: 'success.dark', fontWeight: 'medium', fontSize: 16 }}>
                                        {item.category}
                                    </Box>
                                    <IconButton onClick={() => handleEditClick(item._id)}><EditCalendarIcon /></IconButton>
                                    <IconButton onClick={() => deleteItem(item._id)}><DeleteIcon /></IconButton>
                                </CardContent>
                            </Card>
                        ))}</div>
                    </Stack>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        defaultDate={new Date()}
                        onSelectEvent={(event) => { }}
                        style={{ height: 500, width: '100%', maxHeight: "60vh" }}
                        views={['month', 'week']}
                        dayPropGetter={getDayProp}
                        onNavigate={handleNavigate}
                        eventPropGetter={eventStyleGetter}
                        popup
                    />
                </Stack>
            </Container>

            {/* Edit Date Dialog */}
            {editDialogOpen && (
                <DatePickerPopup
                    onClose={handleCloseEditDialog}
                    onSubmit={handleDateSubmit}
                />
            )}
        </div>
    );
};

export default Display;