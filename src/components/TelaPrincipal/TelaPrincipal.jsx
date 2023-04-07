import React, { useState } from "react";
import './TelaPrincipal.css';
import GraficoComparacaoNotas from "./GraficoComparacaoNotas";
import Select from 'react-select';
import { useEffect } from "react";
import axios from "axios";

export default function TelaPrincipal(props) {
    const [anoInicial, setAnoInicial] = useState('')
    const [anoFinal, setAnoFinal] = useState('')
    const [municipioIes1, setMunicipioIes1] = useState('')
    const [municipioIes2, setMunicipioIes2] = useState('')
    const [ies1, setIes1] = useState('')
    const [ies2, setIes2] = useState('')
    const [area, setArea] = useState('')

    const [grafico1, setGrafico1] = useState();

    const [areaOptions, setAreaOptions] = useState([]);
    const [anoInicialOptions, setAnoInicialOptions] = useState([]);
    const [anoFinalOptions, setAnoFinalOptions] = useState([]);
    const [ies1Options, setIes1Options] = useState([]);
    const [ies2Options, setIes2Options] = useState([]);
    const [municipioIes1Options, setMunicipioIes1Options] = useState([]);
    const [municipioIes2Options, setMunicipioIes2Options] = useState([]);



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

    // function limparCampos(){
    //setAnoFinalOptions([]);
    //}

    useEffect(() => {
        //todas as áreas
        axios.get(`http://localhost:8080/analiseenade/consulta-todas-areas`)
            .then(response => {
                //console.log(JSON.stringify(response.data));
                const lista = response.data;
                const lista2 = [];
                lista.map((e) => {
                    lista2.push({
                        value: e.trim(),
                        label: formatarPalavra(e)
                    })
                    console.log(formatarPalavra(e))
                })
                //console.log(lista2);
                setAreaOptions(lista2);

            })
            .catch(error => {
                console.log(error);
            });

        //Todos os municípios
        axios.get(`http://localhost:8080/analiseenade/consulta-todos-municipios`)
            .then(response => {
                //console.log(JSON.stringify(response.data));
                const lista = response.data;
                const lista2 = [];
                lista.map((e) => {
                    lista2.push({
                        value: e.trim(),
                        label: formatarPalavra(e)
                    })
                    console.log(formatarPalavra(e))
                })
                //console.log(lista2);
                setMunicipioIes1Options(lista2);
                setMunicipioIes2Options(lista2);

            })
            .catch(error => {
                console.log(error);
            });

    }, []);



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
                            <Select id="area" placeholder="Área" options={areaOptions} onChange={(areaEscolhida) => {
                                setArea(areaEscolhida.value)
                                //limparCampos();
                                //const urlAnoArea = "http://localhost:8080/analiseenade/consulta-edicoes-por-area?nomeArea="+areaEscolhida;
                                axios.get(`http://localhost:8080/analiseenade/consulta-edicoes-por-area?nomeArea=${areaEscolhida.value}`)
                                    .then(response => {
                                        //console.log(JSON.stringify(response.data));
                                        const lista = response.data;
                                        const listaAnos = [];
                                        lista.map((e) => { listaAnos.push({ value: e.trim(), label: e }) })
                                        setAnoInicialOptions(listaAnos);
                                        setAnoFinalOptions(listaAnos);
                                        //console.log(response.data);

                                    })
                                    .catch(error => {
                                        console.log(error);

                                        const objectDefaultAnos = [
                                            { value: '2014', label: '2014' },
                                            { value: '2015', label: '2015' },
                                            { value: '2016', label: '2016' },
                                            { value: '2017', label: '2017' },
                                            { value: '2018', label: '2018' },
                                            { value: '2019', label: '2019' },
                                            { value: '2020', label: '2020' },
                                            { value: '2021', label: '2021' },
                                            { value: '2022', label: '2022' },
                                            { value: '2023', label: '2023' },
                                        ]

                                        setAnoInicialOptions(objectDefaultAnos);
                                        setAnoFinalOptions(objectDefaultAnos);
                                    });
                                //IES
                                axios.get(`http://localhost:8080/analiseenade/consulta-todos-ies?nomeArea=${areaEscolhida.value}`)
                                    .then(response => {
                                        //console.log(JSON.stringify(response.data));
                                        console.log(JSON.stringify(response.data))
                                        //console.log(response.data);
                                        const lista = response.data;
                                        const lista2 = [];
                                        lista.map((e) => {
                                            lista2.push({
                                                value: e.trim(),
                                                label: formatarPalavra(e)
                                            })
                                            console.log(formatarPalavra(e))
                                        })
                                        setIes1Options(lista2);
                                        setIes2Options(lista2);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });

                            }}></Select>
                            <Select  placeholder="Ano Inicial" options={anoInicialOptions} onChange={(e)=>{setAnoInicial(e.value)}}></Select>
                            <Select  placeholder="Ano Final" options={anoFinalOptions} onChange={(e)=>{setAnoFinal(e.value)}}></Select>
                            <Select  placeholder="Instituto de Ensino Superior 1" options={ies1Options} onChange={(e)=>{setIes1(e.value)}}></Select>
                            <Select  placeholder="Município IES 1" options={municipioIes1Options} onChange={(e)=>{setMunicipioIes1(e.value)}}></Select>
                            <Select  placeholder="Instituto de Ensino Superior 2" options={ies2Options} onChange={(e)=>{setIes2(e.value)}}></Select>
                            <Select  vplaceholder="Município IES 2" options={municipioIes2Options} onChange={(e)=>{setMunicipioIes2(e.value)}}></Select>
                            {/* <input placeholder="Ano Inicial" id="anoInicial" onChange={() => { setAnoInicial(document.getElementById("anoInicial").value) }}></input> */}
                            {/* <input placeholder="Ano Final" id="anoFinal" onChange={() => { setAnoFinal(document.getElementById("anoFinal").value) }}></input> */}
                            {/* <input placeholder="Município IES 1" id="municipioIes1" onChange={() => { setMunicipioIes1(document.getElementById("municipioIes1").value) }}></input>
                            <input placeholder="Município IES 2" id="municipioIes2" onChange={() => { setMunicipioIes2(document.getElementById("municipioIes2").value) }}></input>
                            <input placeholder="IES 1 " id="ies1" onChange={() => { setIes1(document.getElementById("ies1").value) }}></input>
                            <input placeholder="IES 2 " id="ies2" onChange={() => { setIes2(document.getElementById("ies2").value) }}></input>
                            <input placeholder="Área de Ensino" id="area" onChange={() => { setArea(document.getElementById("area").value) }}></input> */}


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
                        {/* ssss
                        <Select options={[
                            { value: 'chocolate', label: 'Chocolate' },
                            { value: 'strawberry', label: 'Strawberry' }
                        ]}></Select> */}
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