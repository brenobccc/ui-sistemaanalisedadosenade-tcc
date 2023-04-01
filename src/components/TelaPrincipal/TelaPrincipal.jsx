import React, { useState } from "react";
import './TelaPrincipal.css';
import GraficoComparacaoNotas from "./GraficoComparacaoNotas";
import Chart from 'chart.js/auto';

export default function TelaPrincipal(props) {
    const [anoInicial, setAnoInicial] = useState('')
    const [anoFinal, setAnoFinal] = useState('')
    const [municipioIes1, setMunicipioIes1] = useState('')
    const [municipioIes2, setMunicipioIes2] = useState('')
    const [ies1, setIes1] = useState('')
    const [ies2, setIes2] = useState('')
    const [area, setArea] = useState('')

    const [grafico1, setGrafico1] = useState();
    return (
        <div id="tela-principal">
            <div id="menu-navegacao">
                <nav id="menu">

                </nav>
            </div>
            <div id="principal-content">
                <div id="pc-header">
                    <font>Dashboard</font>
                    <div id="pch-filtros">
                        <div id="filtros">
                            <input placeholder="Ano Inicial" id="anoInicial" onChange={() => {
                                // console.log(document.getElementById("anoInicial").value)
                                setAnoInicial(document.getElementById("anoInicial").value)
                                // console.log(anoInicial)
                            }}></input>
                            <input placeholder="Ano Final" id="anoFinal" onChange={() => { setAnoFinal(document.getElementById("anoFinal").value) }}></input>
                            <input placeholder="Município IES 1" id="municipioIes1" onChange={() => { setMunicipioIes1(document.getElementById("municipioIes1").value) }}></input>
                            <input placeholder="Município IES 2" id="municipioIes2" onChange={() => { setMunicipioIes2(document.getElementById("municipioIes2").value) }}></input>
                            <input placeholder="IES 1 " id="ies1" onChange={() => { setIes1(document.getElementById("ies1").value) }}></input>
                            <input placeholder="IES 2 " id="ies2" onChange={() => { setIes2(document.getElementById("ies2").value) }}></input>
                            <input placeholder="Área de Ensino" id="area" onChange={() => { setArea(document.getElementById("area").value) }}></input>


                        </div>
                        <div id="filtros-button">
                            <button onClick={() => {
                                console.log(anoInicial)

                                setGrafico1(<GraficoComparacaoNotas
                                    anoInicial={anoInicial}
                                    anoFinal={anoFinal}
                                    municipioIes1={municipioIes1}
                                    municipioIes2={municipioIes2}
                                    nomeIes1={ies1}
                                    nomeIes2={ies2}
                                    area={area}></GraficoComparacaoNotas>)
                            }}> Consultar </button>
                        </div>
                    </div>
                </div>
                <div id="pc-content">
                    {/* <GraficoComparacaoNotas></GraficoComparacaoNotas> */}
                    {grafico1}
                    <div id="grafico2">

                    </div>
                    <div id="grafico3">

                    </div>
                    <div id="grafico4">

                    </div>
                    {/* <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>

                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p>
                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </p> */}
                </div>
            </div>
        </div>

    )

}