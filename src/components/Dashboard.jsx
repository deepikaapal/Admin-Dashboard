import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Card from './Card';
import Reports from './Reports';
import RecentSales from './RecentSales';
import TopSelling from './TopSelling';
import RecentActivity from './RecentActivity';
import BudgetReport from './BudgetReport';
import WebTraffic from './WebTraffic';
import CardFilter from './CardFilter';
import axios from 'axios';
import DateTimeDisplay from './DateTimeDisplay';

function Dashboard() {
    const [cards, setCards] = useState([]);
    const [filteredDetails, setFilteredDetails] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [approvedcount, setApprovedcount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0); 
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const [showFreePaidCards, setShowFreePaidCards] = useState(false); // State for showing Free and Paid cards
    

    const orderData = async() => {
        try {
            const res = await axios.get('http://localhost:5000/orderdetails');
            const data = res.data;
            setOrderDetails(data);
            setFilteredDetails(data); // Initialize filteredDetails with all data
            
            let count = 0; 
            let totalAmount = 0; 

            data.forEach((item) => {
                if (item.status === 'approved') {
                    count++;
                }
                const amount = parseFloat(item.total_amt);
                if (!isNaN(amount)) {
                    totalAmount += amount;
                }
            });

            setApprovedcount(count);
            setTotalAmount(totalAmount);
        } catch(e) {
            console.log(e.message);
        }
    };

    const fetchData = () => {
        try {
            fetch('http://localhost:4000/cards')
            .then(res => res.json())
            .then(data => {
                setCards(data);
            })
            .catch(e => console.log(e.message));
        } catch(e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        fetchData();
        orderData();
    }, []);

    const handleFilterChange = (dates) => { 
        const [startDate, endDate] = dates.split(" - ");
        setSelectedDateRange(dates); // Update the selected date range state

        const filteredOrders = orderDetails.filter(order => {
            const orderDate = new Date(order.date);
            return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
        });

        let count = 0;
        let totalAmount = 0;

        filteredOrders.forEach((item) => {
            if (item.status === 'approved') {
                count++;
            }
            const amount = parseFloat(item.total_amt);
            if (!isNaN(amount)) {
                totalAmount += amount;
            }
        });

        setApprovedcount(count);
        setTotalAmount(totalAmount);
        setFilteredDetails(filteredOrders);
    };

    const handleSatelliteClick = () => {
        setShowFreePaidCards(prevState => !prevState); // Toggle the visibility of Free and Paid cards
    };

    return (
        <section className="dashboard section">
            <div className="row">
                <div className="col-12">
                    {selectedDateRange && (
                        <p className="date-range-display">{selectedDateRange}</p>
                    )}
                </div>
                <div className="">
                    <CardFilter filterChange={handleFilterChange}/>
                    <DateTimeDisplay/>
                </div>
                <div className="col-lg-8">
                    <div className="row">
                        <Card 
                        name={"Satellite"} 
                        totalsales={approvedcount} 
                        onClick={handleSatelliteClick}
                        highlight={showFreePaidCards}
                        /> 
                        {showFreePaidCards && (
                            <div className="subpoints">
                                <Card name={"Free"} totalsales={approvedcount / 2}/>
                                <Card name={"Paid"} totalsales={approvedcount / 2}/>
                            </div>

                        )}
                        <Card name={"Vector"} totalsales={(new Intl.NumberFormat('en-IN').format(totalAmount.toFixed(2)))}/>
                        <Card name={"Online"} totalsales={filteredDetails.length}/>
                        
                        <div className="col-12">
                            <Reports/>
                        </div>
                        <div className="col-12">
                            <RecentSales dateRange={selectedDateRange} /> {/* Pass selectedDateRange to RecentSales */}
                        </div>
                        <div className="col-12">
                            <TopSelling dateRange={selectedDateRange}/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <RecentActivity/>
                    <BudgetReport/>
                    <WebTraffic/>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;
