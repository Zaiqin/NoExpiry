import React, { useEffect, useState } from 'react';
import { Button, TextField, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { auth } from '../firebase';

const Form = ({ open, onClose, onSubmit }) => {

    const [formData, setFormData] = useState({
        user: '',
        name: '',
        notes: '',
        expiryDate: null, // Initialize date as null
    });

    useEffect(() => {
        // Listen for changes in authentication state
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setFormData({ ...formData, user: user.email });
            }
        });

        // Clean up function
        return () => unsubscribe();
    }, []); // Empty dependency array to run once on mount
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, expiryDate: date });
    };

    async function handleSubmit(event) {
        if (!formData.name || !formData.expiryDate) {
            alert("Please fill in all the details before submitting.");
            return;
        }
        try {
            const response = await fetch(`${process.env.VITE_REACT_APP_SERVER_URI}/api/new`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("New item added:", responseData);
            setFormData({ ...formData, name: '', expiryDate: null, });
            onSubmit();
        } catch (error) {
            console.error('A problem occurred with your fetch operation: ', error);
            onClose();
        }
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Add New Item</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={{ xs: 1, sm: 2, md: 2 }}>
                        <TextField
                            name="name"
                            label="Item Name"
                            variant="outlined"
                            value={formData.name}
                            rows={1}
                            onChange={handleChange}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Set Expiry Date"
                                value={formData.expiryDate}
                                onChange={handleDateChange}
                                
                            />
                        </LocalizationProvider>
                        <TextField
                            name="notes"
                            label="Notes (Optional)"
                            variant="outlined"
                            value={formData.notes}
                            multiline
                            rows={2}
                            onChange={handleChange}
                        />
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ mr: 2, mb: 1 }}>
                <Button onClick={onClose} variant="contained" color="error">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Form;