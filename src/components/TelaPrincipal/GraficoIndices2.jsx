import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';

export default function GraficoIndices2(props) {
    // Dados para o gráfico
    const [graficoPizza, setGraficoPizza] = useState([])

    function formatarPalavra(palavra) {
        const palavrasDeLigacao = ['e', 'de', 'da', 'do', 'dos', 'das', 'para', 'com'];

        return palavra.split(' ')
            .map(function (palavra, index) {
                if (index === 0 || !palavrasDeLigacao.includes(palavra.toLowerCase())) {
                    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
                } else {
                    return palavra.toLowerCase();
                }
            })
            .join(' ');
    }

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
        var chart = Chart.getChart("chartpizza3")
        if (chart) {
            chart.destroy();
        }
        console.log(" grafico  3 ")
        const anoInicial = props.anoInicial
        const anoFinal = props.anoFinal
        const municipioIes1 = props.municipioIes1
        const municipioIes2 = props.municipioIes2
        const area = props.area
        const nomeIes1 = props.nomeIes1
        const nomeIes2 = props.nomeIes2
        const url = `https://api-enade-production.up.railway.app/analiseenade/consulta-dados-por-ano-municipio-area-nomeies3?anoInicial=${anoInicial}&anoFinal=${anoFinal}&municipio1=${municipioIes1}&municipio2=${municipioIes2}&area=${area}&nomeies1=${nomeIes1}&nomeies2=${nomeIes2}`;
        axios.get(url)
            .then(response => {
                console.log("dado: ");
                console.log(response.data);

                console.log("url: "+url);
                let list0 = []
                response.data[0].map((e) => {
                    //console.log(e);
                    list0.push(e !== 'undefined' ? parseInt(e) : 0);
                })

                //numeros alunos
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

                setGraficoPizza(new Chart(document.getElementById("chartpizza3"), {
                    type: 'bar',
                    data: {
                        labels: list0,
                        datasets: [{
                            label: formatarPalavra(nomeIes1) + ' - ' + formatarPalavra(municipioIes1),
                            data: list1,
                            backgroundColor: "#E86031",
                            borderColor: "#BB3B10",
                            //fill:false
                        }, {
                            label: formatarPalavra(nomeIes2) + ' - ' + formatarPalavra(municipioIes2),
                            data: list2,
                            backgroundColor: "#305FD6",
                            borderColor: "#0F38A1",
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
                        plugins: {
                            title: {
                                display: true,
                                text: "Comparação Alunos Participantes"
                            },
                            legend: {
                                display: true,
                                position: 'bottom'
                            }
                        },
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
        width: "100%",
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}><canvas id="chartpizza3"></canvas></div>)


}