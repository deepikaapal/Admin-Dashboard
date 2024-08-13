import React, { useState, useEffect } from 'react'
import './dashboard.css'
import Card from './Card'
import Reports from './Reports'
import RecentSales from './RecentSales'
import TopSelling from './TopSelling';
import RecentActivity from './RecentActivity';
import BudgetReport from './BudgetReport';
import WebTraffic from './WebTraffic';
import CardFilter from './CardFilter';
import axios from 'axios'

function Dashboard() {
    const [cards, setCards] = useState([])
    const [filteredDetails, setFilteredDetails] = useState([])
    const [orderDetails, setOrderDetails] = useState([])
    const [approvedcount, setApprovedcount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0); 
    // const [filterDates, setFilterDates] = useState('')  

    const orderData = async() => {
        try{
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
    }

    const fetchData = () => {
        try{
            fetch('http://localhost:4000/cards')
            .then(res => res.json())
            .then(data => {
                setCards(data);
            })
            .catch(e => console.log(e.message));
        } catch(e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        fetchData();
        orderData();
    }, []);

    const handleFilterChange = (dates) => { 
        const [startDate, endDate] = dates.split(" - ");
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

    return (
        <section className="dashboard section">
            <div className="row">
                <div className="">
                    <CardFilter filterChange={handleFilterChange}/>
                </div>
                <div className="col-lg-8">
                    <div className="row">
                        <Card name={"Sales"} totalsales={approvedcount}/>
                        <Card name={"Revenue"} totalsales={(new Intl.NumberFormat('en-IN').format(totalAmount.toFixed(2)))}/>
                        <Card name={"Customers"} totalsales={filteredDetails.length}/>
                        
                        <div className="col-12">
                            <Reports/>
                        </div>
                        <div className="col-12">
                            <RecentSales/>
                        </div>
                        <div className="col-12">
                            <TopSelling/>
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

export default Dashboard
