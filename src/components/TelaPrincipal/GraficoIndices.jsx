import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';

export default function GraficoIndices(props) {
    // Dados para o gráfico
    const [graficoPizza, setGraficoPizza] = useState([])

    var options = {

        plugins: {
            title: {
                display: true,
                text: "Quantidade de alunos por tipos de Instituição:"
            },
            legend: {
                display: true,
                position: 'bottom'
            }
        },
        responsive: true
    };

    useEffect(() => {
        var chart = Chart.getChart("chartpizza2")
        if (chart) {
            chart.destroy();
        }

        const anoInicial = props.anoInicial
        const anoFinal = props.anoFinal
        const municipioIes1 = props.municipioIes1
        const municipioIes2 = props.municipioIes2
        const area = props.area
        const nomeIes1 = props.nomeIes1
        const nomeIes2 = props.nomeIes2

        axios.get(`http://localhost:8080/analiseenade/consulta-dados-por-ano-municipio-area-nomeies?anoInicial=${anoInicial}&anoFinal=${anoFinal}&municipio1=${municipioIes1}&municipio2=${municipioIes2}&area=${area}&nomeies1=${nomeIes1}&nomeies2=${nomeIes2}`)
            .then(response => {
                console.log("dado: ");

                let list0 = []
                response.data[0].map((e) => {
                    //console.log(e);
                    list0.push(e !== 'undefined' ? parseInt(e) : 0);
                })

                let list1 = []
                response.data[1].map((e) => {
                    //console.log(e);
                    list1.push(e !== 'undefined' ? parseInt(e) : 0);
                })

                let list2 = []
                response.data[2].map((e) => {
                    //console.log(e);
                    list2.push(e !== 'undefined' ? parseInt(e) : 0);
                })

                console.log("lista 1 : ", JSON.stringify(list1));

                console.log("lista 2 : ", JSON.stringify(list2));

                setGraficoPizza(new Chart(document.getElementById("chartpizza2"), {
                    type: 'bar',
                    data: {
                        labels: list0,
                        datasets: [{
                            label: 'Alunos Concluíntes',
                            data: list1,
                            backgroundColor: "blue",
                            borderColor: "blue",
                            //fill:false
                        }, {
                            label: 'Alunos Participantes',
                            data: list2,
                            backgroundColor: "green",
                            borderColor: "green",
                            //fill:false
                        },
                            // {
                            //     label: 'Universade Pública',
                            //     data: [50, 40, 28],
                            //     backgroundColor: "orange",
                            //     borderColor: "orange",
                            //     //fill:false
                            // },
                            // {
                            //     label: 'Universade Privada',
                            //     data: [50, 40, 28],
                            //     backgroundColor: "red",
                            //     borderColor: "red",
                            //     //fill:false
                            // }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: "Qtde alunos"
                                },
                                ticks: {
                                    precision: 0
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: "Ano"
                                }
                            }
                        }
                    }
                }))
            }).catch(error => {
                console.log(error);
            });


    }, [props])
    // Opções para o gráfico

    return (<div style={{
        height: '100%',
        width: "80%",
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}><canvas id="chartpizza2"></canvas></div>)


}