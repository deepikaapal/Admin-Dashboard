import React, { useState, useEffect } from 'react';
import './recentSales.css';
import RecentSalesTable from './RecentSalesTable';

function RecentSales({ selectedDateRange }) { // Receive the date range as a prop
    const [items, setItems] = useState([]);
    
    const fetchData = () => {
        fetch('http://localhost:4000/recentsales')
            .then(res => res.json())
            .then(data => {
                setItems(data);
            })
            .catch(e => console.log(e.message));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const filterItems = () => {
        if (!selectedDateRange) {
            return items;
        }

        const [startDate, endDate] = selectedDateRange.split(" - ");
        return items.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
        });
    };

    return (
        <div className="card recent-sales overflow-auto">
            <div className="card-body">
                <h5 className="card-title">
                    Recent Sales
                </h5>
                <RecentSalesTable items={filterItems()} />
            </div>
        </div>
    );
}

export default RecentSales;
