import React, {useEffect} from 'react'
import * as echarts from 'echarts';


function WebTrafficChart() {
    useEffect(() => {
        echarts.init(document.querySelector('#trafficChart')).setOption({
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '2%',
                fontSize: '14px',
                left: 'center',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    top: '9%',
                    left: '3%',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        {
                            value: 1048,
                            name: 'Search Engine',
                        },
                        {
                            value: 735,
                            name: 'Direct',
                        },
                        {
                            valye: 580,
                            name: 'Email',
                        },
                        {
                            value: 484,
                            name: 'Union Ads',
                        },
                        {
                            value: 300,
                            name:'Video Ads',
                        },
                    ],
                },
            ],
        });
    }, []);
  return (
    <div
        id="trafficChart"
        style={{ minHeight: '430px' }}
        className="echart"
    ></div>
  );
}

export default WebTrafficChart