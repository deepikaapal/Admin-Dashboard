import React, { useState, useEffect } from 'react';
import './recentSales.css';
import RecentSalesTable from './RecentSalesTable';

function RecentSales({ dateRange }) {
    const [items, setItems] = useState([]);

    const fetchData = () => {
        fetch('http://localhost:4000/recentsales')
            .then(res => res.json())
            .then(data => {
                if (dateRange) {
                    const [startDate, endDate] = dateRange.split(" - ");
                    const filteredData = data.filter(item => {
                        const itemDate = new Date(item.date);
                        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
                    });
                    setItems(filteredData);
                } else {
                    setItems(data);
                }
            })
            .catch(e => console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, [dateRange]);

    return (
        <div className="card recent-sales overflow-auto">
            <div className="card-body">
                <h5 className="card-title">
                    Recent Sales
                </h5>
                <RecentSalesTable items={items}/>
            </div>
        </div>
    );
}

export default RecentSales;
