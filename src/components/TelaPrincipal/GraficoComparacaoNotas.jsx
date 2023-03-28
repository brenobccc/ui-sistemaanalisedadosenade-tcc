import React, { useEffect } from "react";
import Chart from 'chart.js/auto';
import './GraficosComparaNotas.css';
import axios from "axios";

export default function GraficoComparacaoNotas() {

    const ies1 = {
        nome: "Universidade A",
        notas: [6.5, 7.2, 8.0, 6.8]
    };
    const ies2 = {
        nome: "Universidade B",
        notas: [5.8, 6.1, 7.0, 6.9]
    };

    useEffect(() => {
        axios.get('http://localhost:8080/analiseenade/consulta-dados-por-ano-municipio-area-nomeies?anoInicial=2014&anoFinal=2021&municipio=Aracati&area=Ciência da Computação&nomeies=Instituto Federal de Educação, Ciência e Tecnologia do Ceará')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    });

    // Labels dos anos
    const labels = ["2010", "2014", "2017", "2021"]
    //const labels = ["2009", "2011", "2013", "2015", "2017", "2019", "2021", "2023"];

    // Dados do gráfico
    const data = {
        labels: labels,
        datasets: [
            {
                label: ies1.nome,
                data: ies1.notas,
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                fill: true,
                tension: 0.3
            },
            {
                label: ies2.nome,
                data: ies2.notas,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.5)",
                fill: true,
                tension: 0.3
            }
        ]
    };

    // Configurações do gráfico
    const options = {

        responsive: false,
        //responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Notas das IES no Enade"
            },
            legend: {
                display: true,
                position: 'right'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Ano"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Nota"
                },
                ticks: {
                    beginAtZero: true
                }
            }
        }
    };

    useEffect(() => {
        const ctx = document.getElementById("myChart").getContext("2d");
        const myChart = new Chart(ctx, {
            type: "line",
            data: data,
            options: options
        });
    }, []);

    return (
        <div id="chartjsexample">
            <canvas id="myChart"></canvas>
        </div>
    );
}
