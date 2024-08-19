import React, { useState, useEffect } from 'react';
import './recentSales.css';
import RecentSalesTable from './RecentSalesTable';

function RecentSales({ dateRange }) {
    const [items, setItems] = useState([]);
    const [showAll, setShowAll] = useState(false);

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

    const displayedItems = showAll ? items : items.slice(0, 5);

    return (
        <div className="card recent-sales overflow-auto">
            <div className="card-body">
                <h5 className="card-title">Recent Sales</h5>
                <RecentSalesTable items={displayedItems} />
                {items.length > 5 && !showAll && (
                    <div className="see-all" style={{ textAlign: 'right', marginTop: '10px' }}>
                        <button className="btn btn-link" onClick={() => setShowAll(true)}>
                            See All
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecentSales;
