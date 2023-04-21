import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';

export default function GraficoPizza() {
    // Dados para o gráfico
    const [graficoPizza, setGraficoPizza] = useState([])

    var data = {
        labels: ["Presencial", "Remoto"],
        datasets: [
            {
                data: [30, 50],
                backgroundColor: ["rgba(255, 0, 0, 0.90)", "rgba(0, 0, 255, 0.50)"]
            }
        ]
    };

    var options = {
        plugins: {
            title: {
                display: true,
                text: "Quantidade de alunos concluíntes/participantes"
            },
            legend: {
                display: true,
                position: 'bottom'
            }
        },
        responsive: true,
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue;
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                    return percentage + "%";
                }
            }
        }
    };

    useEffect(() => {
        var chart = Chart.getChart("chartpizza")
        if (chart) {
            chart.destroy();
        }
        setGraficoPizza(new Chart(document.getElementById("chartpizza"), {
            type: 'pie',
            data: data,
            options: options
        }))
    }, [])
    // Opções para o gráfico

    return (<div style={{
        height: '100%',
        width: "45%",
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}><canvas id="chartpizza"></canvas></div>)


}