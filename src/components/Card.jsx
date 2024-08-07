import React, { useState } from 'react'
import './card.css'
import CardFilter from './CardFilter';

function Card({ card }) {
  const [filter, setFilter] = useState('Today');
  const [customRange, setCustomRange] = useState('');
  
  const handleFilterChange = (filter, dateRange = []) => {
    setFilter(filter);

    if (filter === 'Custom Range' && dateRange.length > 0) {
      setCustomRange(dateRange.join(' - '));
    } else {
      setCustomRange('');
    }
  };
  
  return (
    <div className="col-xxl-4 col-md-6">
      <div className = "card info-card sales-card">
        <CardFilter filterChange={handleFilterChange}/>
        <div className="card-body">
          <h5 className="card-title">
            {card.name} <span> | {filter}</span>
          </h5>

          {customRange && <p>{customRange}</p>}

          <div className="d-flex align-items-center"> 
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className={card.icon}></i>
            </div>
            <div className="ps-3">
              <h6>
                {card.name === 'Revenue'
                ? '₹' + card.amount.toLocaleString('en-IN')
                : card.amount.toLocaleString('en-IN')}
              </h6>
              <span 
              className={`${
                card.percentage > 0 ? 'text-success' : 'text-danger'
              } small pt-1 fw-bold1`}
              >
               {card.percentage > 0
               ? card.percentage *100
              :-card.percentage * 100}
              % 
              </span>
              <span className="text-muted small pt-2 ps-1">
                {card.percentage > 0 ? 'increase' : 'decrease'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;