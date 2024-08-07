import React, {useState} from 'react'
import CardFilter from './CardFilter';
import WebTrafficChart from './WebTrafficChart';

function WebTraffic() {
    const [filter, setFilter] = useState('Today');
    const handleFilterChnage = filter => {
        setFilter(filter);
    };

  return (
    <div className="card">
        <CardFilter filterChange={handleFilterChnage} />
        <div className="card-body pb-0">
            <h5 className="card-title">
                Website Traffic <span>| {filter}</span>
            </h5>
            <WebTrafficChart/>
        </div>
    </div>
  )
}

export default WebTraffic