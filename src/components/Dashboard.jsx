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
    // const [filteredOrderDetails, setfilterOrderDetails] = useState([])
    const [orderDetails, setOrderDetails] = useState([])
    const [approvedcount, setApprovedcount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);   

    const orderData = async() => {
        try{
            const res = await axios.get('http://localhost:5000/orderdetails');
        const data = res.data;
        setOrderDetails(data);
        
        let count = 0; // Declare and initialize count outside the iteration
        let totalAmount = 0; // Declare and initialize totalAmount to sum total_amount

        data.forEach((item) => {
            if (item.status === 'approved') {
                count++;
                    // console.log(item.total_amt);
            }
            const amount = (parseFloat(item.total_amt));
                if (!isNaN(amount)) {
                        totalAmount += amount;
                }
        });

        setApprovedcount(count)

        // console.log('Approved count:', count); // Log the count to verify
         // console.log('Total Amount:', new Intl.NumberFormat('en-IN').format(totalAmount)); 
        // console.log('Total Amount:', Number(totalAmount).toFixed(2)); 

        setTotalAmount(totalAmount);

    }catch(e){
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
        .catch(e=>console.log(e.message));
    }catch(e){
        console.log(e.message);
    }
}
useEffect(() => {
    fetchData();
    orderData();
}, []);

    const handleFilterChange = (dates) => { 
        // Split the date string by " - " to separate the start and end dates
        const [startDate, endDate] = dates.split(" - ");

        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
      };

      return (
        <section className="dashboard section">
            <div className="row">
                <div className="">
                    <CardFilter filterChange={handleFilterChange}/>
                </div>
                <div className="col-lg-8">
                    <div className="row">
                        {/* {
                            cards && cards.length > 0 && cards.map(card=> <Card key={card._id} card={card}/>)
                        } */}
                        < Card name={"Sales"} totalsales={approvedcount}/>
                        < Card name={"Revenue"} totalsales={(new Intl.NumberFormat('en-IN').format(totalAmount.toFixed(2)))}/>
                        < Card name={"Customers"} totalsales={(orderDetails.length)}/>
                        
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