import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../react-cal.css"

const DatePickerPopup = ({ onClose, onSubmit }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = () => {
        onSubmit(selectedDate);
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Select a Date</DialogTitle>
            <DialogContent>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                />
                <button onClick={handleSubmit}>Submit</button>
            </DialogContent>
        </Dialog>
    );
};

export default DatePickerPopup;
