import React, { useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import './GraficosComparaNotas.css';
import axios from "axios";

export default function GraficoComparacaoNotas(props) {
    const [ies1, setIes1] = useState({});

    const [ies2, setIes2] = useState({});

    const [labels, setLabels] = useState([]);

    //const labels = ["2010", "2014", "2017", "2021"]

    /*const ies1 = {
        nome: "Universidade A",
        notas: ['undefined', '7.2', '7', '6.8']
    };*/
    // const ies2 = {
    //     nome: "Universidade B",
    //     notas: ['5.8', '6.1', '5', '6.9']
    // };
    // Labels dos anos
    //const labels = ["2009", "2011", "2013", "2015", "2017", "2019", "2021", "2023"];

    // Dados do gráfico
    const [myChart, setChart] = useState();

    useEffect(() => {
        var chart = Chart.getChart("myChart")
        if (chart) {
            chart.destroy();
        }
        // alert("chamou")
        console.log(props)
        //dados
        const anoInicial = props.anoInicial
        const anoFinal = props.anoFinal
        const municipioIes1 = props.municipioIes1
        const municipioIes2 = props.municipioIes2
        const area = props.area
        const nomeIes1 = props.nomeIes1
        const nomeIes2 = props.nomeIes2

        axios.get(`http://localhost:8080/analiseenade/consulta-dados-por-ano-municipio-area-nomeies?anoInicial=${anoInicial}&anoFinal=${anoFinal}&municipio1=${municipioIes1}&municipio2=${municipioIes2}&area=${area}&nomeies1=${nomeIes1}&nomeies2=${nomeIes2}`)
            .then(response => {


                console.log("codigo 1: " + JSON.stringify(response.data));
                // setLabels(response.data[0]);
                // setIes1({
                //     nome: "Universidade A",
                //     notas: response.data[1]
                // });
                // console.log("ies1: " + JSON.stringify(ies1));
                // setIes2({
                //     nome: "Universidade B",
                //     notas: response.data[2]
                // });

                setChart(new Chart(document.getElementById("myChart").getContext("2d"), {
                    type: "line",
                    data: {
                        labels: response.data[0],
                        datasets: [
                            {
                                label: nomeIes1,
                                data: response.data[1],
                                borderColor: "red",
                                backgroundColor: "rgba(255, 0, 0, 0.1)",
                                fill: true,
                                tension: 0.3
                            },
                            {
                                label: nomeIes2,
                                data: response.data[2],
                                borderColor: "blue",
                                backgroundColor: "rgba(0, 0, 255, 0.5)",
                                fill: true,
                                tension: 0.3
                            }
                        ]
                    },
                    options: {

                        responsive: true,
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
                    }
                }));
            })
            .catch(error => {
                console.log(error);
            });

        // Configurações do gráfico


    }, [props]);

    return (
        <>
            <div id="chartjsexample">
                <canvas id="myChart"></canvas>
            </div>
            {/* <button onClick={() => { console.log(myChart) }}></button> */}
        </>
    );
}
