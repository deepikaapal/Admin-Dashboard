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
    const [showFreePaidCards, setShowFreePaidCards] = useState(false);
    const [showFreeSubpoints, setShowFreeSubpoints] = useState(false);
    const [showPaidSubpoints, setShowPaidSubpoints] = useState(false);
    const [selectedSubpoint, setSelectedSubpoint] = useState('');
    const [showVectorSubparts, setShowVectorSubparts] = useState(false);
    const [showVectorFreeSubpoints, setShowVectorFreeSubpoints] = useState(false);
    const [showVectorPaidSubpoints, setShowVectorPaidSubpoints] = useState(false);

    const [showOnlineSubparts, setShowOnlineSubparts] = useState(false);
    const [showOnlineFreeSubpoints, setShowOnlineFreeSubpoints] = useState(false);
    const [showOnlinePaidSubpoints, setShowOnlinePaidSubpoints] = useState(false);



    const orderData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/orderdetails');
            const data = res.data;
            setOrderDetails(data);
            setFilteredDetails(data);

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
        setSelectedDateRange(dates);

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
        setShowFreePaidCards(prevState => !prevState); 
        setShowFreeSubpoints(false);
        setShowPaidSubpoints(false);
    };

    const handleFreeClick = () => {
        setShowFreeSubpoints(prevState => !prevState);
        setShowPaidSubpoints(false);
        if (!showFreeSubpoints) {
            setSelectedSubpoint(''); 
        }
    };
    
    const handlePaidClick = () => {
        setShowPaidSubpoints(prevState => !prevState);
        setShowFreeSubpoints(false);
        if (!showPaidSubpoints) {
            setSelectedSubpoint(''); 
        }
    };
    
    const handleSubpointClick = (subpointName) => {
        setSelectedSubpoint(subpointName);
    };


    // For Vector
    const handleVectorClick = () => {
        setShowVectorSubparts(prevState => !prevState);
        setShowVectorFreeSubpoints(false);
        setShowVectorPaidSubpoints(false);
    };

    const handleVectorFreeClick = () => {
        setShowVectorFreeSubpoints(prevState => !prevState);
        setShowVectorPaidSubpoints(false);
        if (!showVectorFreeSubpoints) {
            setSelectedSubpoint(''); 
        }
    };

    const handleVectorPaidClick = () => {
        setShowVectorPaidSubpoints(prevState => !prevState);
        setShowVectorFreeSubpoints(false);
        if (!showVectorPaidSubpoints) {
            setSelectedSubpoint(''); 
        }
    };

    // For Online
    const handleOnlineClick = () => {
        setShowOnlineSubparts(prevState => !prevState);
        setShowOnlineFreeSubpoints(false);
        setShowOnlinePaidSubpoints(false);
    };

    const handleOnlineFreeClick = () => {
        setShowOnlineFreeSubpoints(prevState => !prevState);
        setShowOnlinePaidSubpoints(false);
        if (!showOnlineFreeSubpoints) {
            setSelectedSubpoint(''); 
        }
    };

    const handleOnlinePaidClick = () => {
        setShowOnlinePaidSubpoints(prevState => !prevState);
        setShowOnlineFreeSubpoints(false);
        if (!showOnlinePaidSubpoints) {
            setSelectedSubpoint(''); 
        }
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
                                <Card 
                                    name={"Free"} 
                                    totalsales={approvedcount / 2}
                                    onClick={handleFreeClick}
                                    highlight={showFreeSubpoints}
                                />
                                <Card 
                                    name={"Paid"} 
                                    totalsales={approvedcount / 2}
                                    onClick={handlePaidClick}
                                    highlight={showPaidSubpoints}
                                />
                            </div>
                        )}
                        {showFreeSubpoints && (
                            <div className="subpoints-details">
                                <Card 
                                name={"AWIFS-Free"} 
                                totalsales={approvedcount / 4}
                                onClick={() => handleSubpointClick('AWIFS')}
                                highlight={selectedSubpoint === 'AWIFS'}
                                />
                                <Card 
                                name={"Sentinel-Free"} 
                                totalsales={approvedcount / 4}
                                onClick={() => handleSubpointClick('Sentinel')}
                                highlight={selectedSubpoint === 'Sentinel'}
                                />
                                <Card 
                                name={"LISS4-Free"} 
                                totalsales={approvedcount / 4}
                                onClick={() => handleSubpointClick('LISS4')}
                                highlight={selectedSubpoint === 'LISS4'}
                                />
                            </div>
                        )}
                        {showPaidSubpoints && (
                            <div className="subpoints-details d-flex">
                                <Card 
                                name={"AWIFS-Paid"} 
                                totalsales={approvedcount / 4}
                                onClick={() => handleSubpointClick('AWIFS')}
                                highlight={selectedSubpoint === 'AWIFS'}
                                />
                                <Card 
                                name={"Sentinel-Paid"} 
                                totalsales={approvedcount / 4}
                                onClick={() => handleSubpointClick('Sentinel')}
                                highlight={selectedSubpoint === 'Sentinel'}/>
                                <Card 
                                name={"LISS4-Paid"} 
                                totalsales={approvedcount / 4}
                                onClick={() => handleSubpointClick('LISS4')}
                                highlight={selectedSubpoint === 'LISS4'}
                                />
                            </div>
                        )}
                        <Card 
    name={"Vector"} 
    totalsales={(new Intl.NumberFormat('en-IN').format(totalAmount.toFixed(2)))} 
    onClick={handleVectorClick}
    highlight={showVectorSubparts}
/>
{showVectorSubparts && (
    <div className="subpoints">
        <Card 
            name={"Free"} 
            totalsales={approvedcount / 2}
            onClick={handleVectorFreeClick}
            highlight={showVectorFreeSubpoints}
        />
        <Card 
            name={"Paid"} 
            totalsales={approvedcount / 2}
            onClick={handleVectorPaidClick}
            highlight={showVectorPaidSubpoints}
        />
    </div>
)}
{showVectorFreeSubpoints && (
    <div className="subpoints-details">
        <Card 
            name={"AWIFS-Free"} 
            totalsales={approvedcount / 4}
            onClick={() => handleSubpointClick('AWIFS')}
            highlight={selectedSubpoint === 'AWIFS'}
        />
        <Card 
            name={"Sentinel-Free"} 
            totalsales={approvedcount / 4}
            onClick={() => handleSubpointClick('Sentinel')}
            highlight={selectedSubpoint === 'Sentinel'}
        />
        <Card 
            name={"LISS4-Free"} 
            totalsales={approvedcount / 4}
            onClick={() => handleSubpointClick('LISS4')}
            highlight={selectedSubpoint === 'LISS4'}
        />
    </div>
)}
{showVectorPaidSubpoints && (
    <div className="subpoints-details">
        <Card 
            name={"AWIFS-Paid"} 
            totalsales={approvedcount / 4}
            onClick={() => handleSubpointClick('AWIFS')}
            highlight={selectedSubpoint === 'AWIFS'}
        />
        <Card 
            name={"Sentinel-Paid"} 
            totalsales={approvedcount / 4}
            onClick={() => handleSubpointClick('Sentinel')}
            highlight={selectedSubpoint === 'Sentinel'}
        />
        <Card 
            name={"LISS4-Paid"} 
            totalsales={approvedcount / 4}
            onClick={() => handleSubpointClick('LISS4')}
            highlight={selectedSubpoint === 'LISS4'}
        />
    </div>
)}

<Card 
    name={"Online"} 
    totalsales={filteredDetails.length} 
    onClick={handleOnlineClick}
    highlight={showOnlineSubparts}
/>
{showOnlineSubparts && (
    <div className="subpoints">
        <Card 
            name={"Free"} 
            totalsales={approvedcount / 2}
            onClick={handleOnlineFreeClick}
            highlight={showOnlineFreeSubpoints}
        />
        <Card 
            name={"Paid"} 
            totalsales={approvedcount / 2}
            onClick={handleOnlinePaidClick}
            highlight={showOnlinePaidSubpoints}
        />
    </div>
)}
{showOnlineFreeSubpoints && (
    <div className="subpoints-details">
        <Card 
            name={"AWIFS-Free"} 
            totalsales={approvedcount / 4}
            onClick={() => handleSubpointClick('AWIFS')}
            highlight={selectedSubpoint === 'AWIFS'}
        />
        <Card 
            name={"Sentinel-Free"} 
            totalsales={approvedcount / 4}
            onClick={() => handleSubpointClick('Sentinel')}
            highlight={selectedSubpoint === 'Sentinel'}
        />
        <Card 
            name={"LISS4-Free"} 
            totalsales={approvedcount / 4}
            onClick={() => handleSubpointClick('LISS4')}
            highlight={selectedSubpoint === 'LISS4'}
        />
    </div>
)}
{showOnlinePaidSubpoints && (
    <div className="subpoints-details">
        <Card 
            name={"AWIFS-Paid"} 
            totalsales={approvedcount / 4}
            onClick={() => handleSubpointClick('AWIFS')}
            highlight={selectedSubpoint === 'AWIFS'}
        />
        <Card 
            name={"Sentinel-Paid"} 
            totalsales={approvedcount / 4}
            onClick={() => handleSubpointClick('Sentinel')}
            highlight={selectedSubpoint === 'Sentinel'}
        />
        <Card 
            name={"LISS4-Paid"} 
            totalsales={approvedcount / 4}
            onClick={() => handleSubpointClick('LISS4')}
            highlight={selectedSubpoint === 'LISS4'}
        />
    </div>
)}

                        
                        <div className="col-12">
                            <Reports/>
                        </div>
                        <div className="col-12">
                            <RecentSales dateRange={selectedDateRange} /> 
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
    );
}

export default Dashboard;
