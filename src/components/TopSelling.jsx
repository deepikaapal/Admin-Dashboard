import React, { useEffect, useState } from 'react';
import './topSelling.css';
import TopSellingItem from './TopSellingItem';

function TopSelling({ dateRange }) {
    const [items, setItems] = useState([]);

    const fetchData = () => {
        fetch('http://localhost:4000/topselling')
            .then(res => res.json())
            .then(data => {
                setItems(data);
            })
            .catch(e => console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filterItemsByDate = (items, dateRange) => {
        if (!dateRange) return items;
        const [startDate, endDate] = dateRange.split(" - ").map(date => new Date(date));
        return items.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= startDate && itemDate <= endDate;
        });
    };

    const filteredItems = filterItemsByDate(items, dateRange);

    return (
        <div className="card top-selling overflow-auto">
            <div className="card-body pb-0">
                <h5 className="card-title">Top Selling</h5>
                <table className="table table-borderless">
                    <thead className="table-light">
                        <tr>
                            <th scope='col'>Preview</th>
                            <th scope='col'>Product</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Sold</th>
                            <th scope='col'>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.map(item => (
                            <TopSellingItem key={item._id} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TopSelling;
