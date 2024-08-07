import React, {useState, useEffect} from 'react'
import './dashboard.css'
import Card from './Card.jsx'
import Report from './Report';
import RecentSales from './RecentSales';
import TopSelling from './TopSelling';
import RecentActivity from './RecentActivity';
import BudgetReport from './BudgetReport';
import WebTraffic from './WebTraffic';

function Dashboard() {
    const[cards,setCards] = useState([]);

    const fetchData = () => {
        fetch('http://localhost:4000/cards')
            .then(res => res.json())
            .then(data => {
                setCards(data);
            })
            .catch(e => console.log(e.message))
    };

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <section className="dashboard section">
        <div className="row">
            <div className="col-lg-8">
                <div className="row">
                    { //whenever we write js in a html file in a react project we need to keep it inside {}
                        cards && 
                        cards.length > 0 &&
                        cards.map(card => <Card key={card._id} card={card} /> )
                    }
                    <div className="col-12">
                        <Report/>
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