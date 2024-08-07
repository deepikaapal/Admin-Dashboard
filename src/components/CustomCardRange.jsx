import React from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function CustomCardRange({ onDateSelect }) {
    const onDateChange = (dates, dateStrings) => {
        onDateSelect(dateStrings); // Pass selected dates to the parent component
    };

    return (
        <div className="custom-card-range">
            <RangePicker onChange={onDateChange} />
        </div>
    );
}

export default CustomCardRange;
