import React, { useState, useEffect } from 'react';

function DateTimeDisplay() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-GB'); // Format as HH:MM:SS
    };

    return (
        <div className="date-time-display">
            <span className="date">{formatDate(currentDateTime)}</span>
            <span className="time">{formatTime(currentDateTime)}</span>
        </div>
    );
}

export default DateTimeDisplay;
