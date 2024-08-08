import React, { useState } from 'react'
import CardFilter from './CardFilter';
import ReportCharts from './ReportCharts';

function Report() {
    const[filter, setFilter] = useState('Today')
    const handleFilterChange = filter => {
        setFilter(filter)
    };
  return (
    <div>
        <div className="card">
            {/* <CardFilter filterChange={handleFilterChange}/> */}
            <div className="card-body">
                <h5 className="card-title">
                    Reports 
                </h5>
                <ReportCharts/>
            </div>
        </div>
    </div>
  )
}

export default Report