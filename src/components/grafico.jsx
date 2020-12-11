import React, { useRef, useEffect } from 'react'
import Chart from 'chart.js'

function Grafico(props) {
    const graph = useRef(null)


    function getDia(data) {
        let dias = []
        data.forEach(element => {
            dias.push(element.dia)
        });
        return dias
    }
    function getMin(data) {
        let mins = []
        data.forEach(element => {
            mins.push(element.minima)
        });
        return mins
    }

    function getMax(data) {
        let maxs = []
        data.forEach(element => {
            maxs.push(element.maxima)
        });
        return maxs
    }

    useEffect(() => {

        var ctx = graph.current.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: getDia(props.info.dias),
                datasets: [{
                    label: 'Maxima C°',
                    data: getMax(props.info.dias),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 97, 97, 1)',
                        'rgba(255, 97, 97, 1)',
                        'rgba(255, 97, 97, 1)',
                        'rgba(255, 97, 97, 1)',
                        'rgba(255, 97, 97, 1)',
                        'rgba(255, 97, 97, 1)',
                        'rgba(255, 97, 97, 1)'
                    ],
                    borderWidth: 8
                }, {
                    label: 'Minima C°',
                    data: getMin(props.info.dias),
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

    }, [])




    return (
        <div className="graph">

            <canvas className="myChart" ref={graph} width="500" height="500"></canvas>
        </div>
    )
}

export default Grafico