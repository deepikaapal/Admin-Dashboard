import React, {useState, useEffect} from 'react'
import Card from './Card.jsx'

function Dashboard() {
    const[cards,setCards] = useState([]);

    const fetchData = () => {
        fetch('http://localhost:3000/cards')
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
                </div>
            </div>
            <div className="col-lg-4"></div>
        </div>
    </section>
  )
}

export default Dashboard