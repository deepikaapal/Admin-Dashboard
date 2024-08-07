import React, { useState } from 'react';
import CustomCardRange from './CustomCardRange';

function CardFilter({ filterChange }) {
    const [showCustomRange, setShowCustomRange] = useState(false);

    const handleFilterChange = (filter) => {
        if (filter === 'Custom Range') {
            setShowCustomRange(!showCustomRange); // Toggle custom range popup visibility
        } else {
            filterChange(filter);
            setShowCustomRange(false); // Close custom range popup if another filter is selected
        }
    };

    return (
        <div className="filter">
            <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                </li>
                <li>
                    <a
                        className="dropdown-item"
                        onClick={() => handleFilterChange('Today')}
                    >
                        Today
                    </a>
                </li>
                <li>
                    <a
                        className="dropdown-item"
                        onClick={() => handleFilterChange('This Month')}
                    >
                        This Month
                    </a>
                </li>
                <li>
                    <a
                        className="dropdown-item"
                        onClick={() => handleFilterChange('This Year')}
                    >
                        This Year
                    </a>
                </li>
                <li>
                    <a
                        className="dropdown-item"
                        onClick={() => handleFilterChange('Custom Range')}
                    >
                        Custom Range
                    </a>
                </li>
            </ul>
            {showCustomRange && (
                <div className="custom-range-popup">
                    <CustomCardRange onDateSelect={(dates) => {
                        filterChange('Custom Range', dates);
                        setShowCustomRange(false); // Close popup after date selection
                    }} />
                </div>
            )}
        </div>
    );
}

export default CardFilter;
