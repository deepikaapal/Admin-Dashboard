import React, { useState, useEffect } from 'react';
import './recentSales.css';
import RecentSalesTable from './RecentSalesTable';

function RecentSales({ selectedDateRange }) {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    const fetchData = () => {
        fetch('http://localhost:4000/recentsales')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setFilteredItems(data); // Initialize with all data
            })
            .catch(e => console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!selectedDateRange) {
            setFilteredItems(items); // No date range, show all items
            return;
        }

        const [startDate, endDate] = selectedDateRange.split(" - ");

        const filtered = items.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
        });

        setFilteredItems(filtered);
    }, [selectedDateRange, items]); // Update whenever selectedDateRange or items change

    return (
        <div className="card recent-sales overflow-auto">
            <div className="card-body">
                <h5 className="card-title">
                    Recent Sales
                </h5>
                <RecentSalesTable items={filteredItems} />
            </div>
        </div>
    );
}

export default RecentSales;
