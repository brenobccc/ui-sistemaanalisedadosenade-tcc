import React, { useState } from "react";
import './TelaPrincipal.css';
import GraficoComparacaoNotas from "./GraficoComparacaoNotas";
import GraficoPizza from "./GraficoPizza";
import GraficoPizza2 from "./GraficoIndices";
import Select from 'react-select';
import { useEffect } from "react";
import axios from "axios";
import GraficoIndices from "./GraficoIndices";
import GraficoIndices2 from "./GraficoIndices2";
import Cabecalho from "../Cabecalho";



export default function TelaPrincipal(props) {
    const [anoInicial, setAnoInicial] = useState('')
    const [anoFinal, setAnoFinal] = useState('')
    const [municipioIes1, setMunicipioIes1] = useState('')
    const [municipioIes2, setMunicipioIes2] = useState('')
    const [ies1, setIes1] = useState('')
    const [ies2, setIes2] = useState('')
    const [area, setArea] = useState('')

    const [grafico1, setGrafico1] = useState(<GraficoComparacaoNotas
        anoInicial={anoInicial}
        anoFinal={anoFinal}
        municipioIes1={municipioIes1}
        municipioIes2={municipioIes2}
        nomeIes1={ies1}
        nomeIes2={ies2}
        area={area}></GraficoComparacaoNotas>);
    const [grafico2, setGrafico2] = useState();
    const [grafico3, setGrafico3] = useState(<GraficoIndices
        anoInicial={anoInicial}
        anoFinal={anoFinal}
        municipioIes1={municipioIes1}
        municipioIes2={municipioIes2}
        nomeIes1={ies1}
        nomeIes2={ies2}
        area={area} />);
    const [grafico4, setGrafico4] = useState(<GraficoIndices2
        anoInicial={anoInicial}
        anoFinal={anoFinal}
        municipioIes1={municipioIes1}
        municipioIes2={municipioIes2}
        nomeIes1={ies1}
        nomeIes2={ies2}
        area={area} />);

    const [areaOptions, setAreaOptions] = useState([]);
    const [anoInicialOptions, setAnoInicialOptions] = useState([]);
    const [anoFinalOptions, setAnoFinalOptions] = useState([]);
    const [ies1Options, setIes1Options] = useState([]);
    const [ies2Options, setIes2Options] = useState([]);
    const [municipioIes1Options, setMunicipioIes1Options] = useState([]);
    const [municipioIes2Options, setMunicipioIes2Options] = useState([]);
    const [inibirTutorial, setInibirTutorial] = useState(false);


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
        const inibir = localStorage.getItem('inibirTutorial');
        setInibirTutorial(inibir === undefined ? false : inibir);
        // alert(inibir);
        //todas as áreas
        axios.get(`https://api-enade-analisedados-production.up.railway.app/analiseenade/consulta-todas-areas`)
            .then(response => {
                //console.log(JSON.stringify(response.data));
                const lista = response.data;
                const lista2 = [];
                lista.map((e) => {
                    lista2.push({
                        value: e.trim(),
                        label: formatarPalavra(e)
                    })
                    //console.log(formatarPalavra(e))
                })
                //console.log(lista2);
                setAreaOptions(lista2);

            })
            .catch(error => {
                console.log(error);
            });

        //Todos os municípios
        // axios.get(`http://localhost:8080/analiseenade/consulta-todos-municipios`)
        //     .then(response => {
        //         //console.log(JSON.stringify(response.data));
        //         const lista = response.data;
        //         const lista2 = [];
        //         lista.map((e) => {
        //             lista2.push({
        //                 value: e.trim(),
        //                 label: formatarPalavra(e)
        //             })
        //             console.log(formatarPalavra(e))
        //         })
        //         //console.log(lista2);
        //         setMunicipioIes1Options(lista2);
        //         setMunicipioIes2Options(lista2);

        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

    }, []);

    const [tutorial, setTutorial] = useState(
        {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: "fixed",
            zIndex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        });


    const [tutorialPagina, setTutorialPagina] = useState(
        {
            width: '900px',
            height: '600px',
            borderRadius: '10px'
        }
    )

    const [tutorialButton, setTutorialButton] = useState(
        {
            width: '100px',
            height: '50px',
            borderRadius: '5px',
            // backgroundColor: 'green'
        }
    )

    const [contador, setContador] = useState(1);

    return (

        <div id="tela-principal">
            {!inibirTutorial ? (<div id="tutorial" style={tutorial}>
                {contador == 1 ? (
                    <div id="tutorial1" style={tutorialPagina}>
                        {/* <div style={{
                            backgroundColor: 'orange',
                            width: '100%',
                            height: '100%',
                        }}></div> */}
                        <div>
                            <button class="pular" style={tutorialButton}
                                onClick={() => {

                                    // setTutorial({
                                    //     visibility: 'hidden',
                                    //     height: 0
                                    // });
                                    // setTutorialPagina({
                                    //     visibility: 'hidden'
                                    // });
                                    // setTutorialButton({
                                    //     visibility: 'hidden'
                                    // });

                                    // document.getElementById('principal-content').style.width = '100%';
                                    setContador(4)
                                }}
                            >Pular</button>
                            <button style={tutorialButton}
                                onClick={() => {
                                    // setTutorial({
                                    //     visibility: 'hidden',
                                    //     height: 0
                                    // });
                                    // setTutorialPagina({
                                    //     visibility: 'hidden'
                                    // });
                                    // setTutorialButton({
                                    //     visibility: 'hidden'
                                    // });

                                    // document.getElementById('principal-content').style.width = '100%';
                                    setContador(contador + 1)
                                }}
                            >Próxima</button>
                        </div>

                    </div>
                ) : (
                    contador == 2 ? (
                        <div id="tutorial2" style={tutorialPagina}>
                            {/* <div style={{
                            backgroundColor: 'orange',
                            width: '100%',
                            height: '100%',
                        }}></div> */}
                            <div>
                                <button class="pular" style={tutorialButton}
                                    onClick={() => {

                                        // setTutorial({
                                        //     visibility: 'hidden',
                                        //     height: 0
                                        // });
                                        // setTutorialPagina({
                                        //     visibility: 'hidden'
                                        // });
                                        // setTutorialButton({
                                        //     visibility: 'hidden'
                                        // });

                                        // document.getElementById('principal-content').style.width = '100%';
                                        setContador(4)
                                    }}
                                >Pular</button>
                                <button style={tutorialButton}
                                    onClick={() => {
                                        // setTutorial({
                                        //     visibility: 'hidden',
                                        //     height: 0
                                        // });
                                        // setTutorialPagina({
                                        //     visibility: 'hidden'
                                        // });
                                        // setTutorialButton({
                                        //     visibility: 'hidden'
                                        // });

                                        // document.getElementById('principal-content').style.width = '100%';
                                        setContador(contador + 1)
                                    }}
                                >Próxima</button>
                            </div>

                        </div>
                    ) : (
                        contador == 3 ? (
                            (
                                <div id="tutorial3" style={tutorialPagina}>
                                    {/* <div style={{
                                    backgroundColor: 'orange',
                                    width: '100%',
                                    height: '100%',
                                }}></div> */}
                                    <div>
                                        {/* <button class="pular" style={tutorialButton}
                                        onClick={() => {
        
                                            // setTutorial({
                                            //     visibility: 'hidden',
                                            //     height: 0
                                            // });
                                            // setTutorialPagina({
                                            //     visibility: 'hidden'
                                            // });
                                            // setTutorialButton({
                                            //     visibility: 'hidden'
                                            // });
        
                                            // document.getElementById('principal-content').style.width = '100%';
                                            setContador(4)
                                        }}
                                    >Pular</button> */}
                                        <button style={tutorialButton}
                                            onClick={() => {
                                                // setTutorial({
                                                //     visibility: 'hidden',
                                                //     height: 0
                                                // });
                                                // setTutorialPagina({
                                                //     visibility: 'hidden'
                                                // });
                                                // setTutorialButton({
                                                //     visibility: 'hidden'
                                                // });

                                                // document.getElementById('principal-content').style.width = '100%';
                                                setContador(contador + 1)
                                            }}
                                        >Próxima</button>
                                    </div>

                                </div>
                            )
                        ) : (
                            (
                                <div style={tutorialPagina} id="tutorial4">
                                    <p>Deseja continuar mostrando a página de tutorial?</p>
                                    <div>
                                        <button style={tutorialButton}
                                            onClick={() => {
                                                setTutorial({
                                                    visibility: 'hidden',
                                                    height: 0
                                                });
                                                setTutorialPagina({
                                                    visibility: 'hidden'
                                                });
                                                setTutorialButton({
                                                    visibility: 'hidden'
                                                });

                                                document.getElementById('principal-content').style.width = '100%';
                                                setContador(contador + 1)
                                            }}
                                        >Sim</button>
                                        <button className="nao" style={tutorialButton}
                                            onClick={() => {
                                                setTutorial({
                                                    visibility: 'hidden',
                                                    height: 0
                                                });
                                                setTutorialPagina({
                                                    visibility: 'hidden'
                                                });
                                                setTutorialButton({
                                                    visibility: 'hidden'
                                                });

                                                document.getElementById('principal-content').style.width = '100%';
                                                setContador(contador + 1);

                                                localStorage.setItem('inibirTutorial', true);
                                            }}
                                        >Não</button>

                                    </div>
                                </div>
                            )
                        )
                    )
                )}

            </div>) : ''}


            {/* <div id="menu-navegacao">
                <nav id="menu">
                    <div id="logo">

                    </div>
                    <div id="navs">
                        <h4 style={{ marginLeft: '5px', fontFamily: 'sans-serif', color: 'white', letterSpacing: '1px' }}> Tipos de Análises </h4>
                        <div className="menus">
                            Comparar Universidades
                        </div>
                        <div className="desabilitado">
                            Comparar Estados
                        </div>
                    </div>
                </nav>
            </div> */}
            <div id="principal-content">
                <Cabecalho style={{
                    width: '100%',
                    height: '280px',
                    backgroundColor: '#FF642F'
                }}

                    estiloNav={{
                        width: '100%',
                        height: '20%',
                        // backgroundColor: 'gray',
                        display: 'flex',
                        justifyContent: 'right'
                    }}

                    estiloTitulo={{
                        width: '100%',
                        height: '80%'
                    }}

                    ul={{
                        padding: 0,
                        width: '400px',
                        height: '90%',
                        margin: 0,
                        marginRight: '5px',
                        // backgroundColor: 'orange',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}

                    li={{
                        width: '130px',
                        height: '90%',
                        backgroundColor: '#B84721',
                        listStyle: 'none',
                        borderRadius: '6px',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontFamily: 'sans-serif',
                        cursor: 'pointer'
                    }}

                />
                <div id="pc-header">
                    <div style={{
                        height: '100%',
                        // backgroundColor: 'red',
                        width: '220px',
                        color: 'white'
                    }}>
                        <h2 className="titulo">Dashboard</h2>
                        <h3>Gráfico de comparação de Universidades</h3>
                    </div>
                    <div id="pch-filtros">
                        <div id="filtros">
                            <div id="filtros1">
                                <Select id="area" placeholder="Área" options={areaOptions} onChange={(areaEscolhida) => {
                                    setArea(areaEscolhida.value)
                                    //limparCampos();
                                    //const urlAnoArea = "http://localhost:8080/analiseenade/consulta-edicoes-por-area?nomeArea="+areaEscolhida;
                                    // setIes1()
                                    // setIes2([])
                                    // setMunicipioIes1([])
                                    // setMunicipioIes2([])
                                    // setAnoInicial([])
                                    // setAnoFinal([]);

                                    setIes1Options([])
                                    setIes2Options([])
                                    setAnoInicialOptions([])
                                    setAnoFinalOptions([])
                                    //console.log(municipioIes1)

                                    axios.get(`https://api-enade-analisedados-production.up.railway.app/analiseenade/consulta-edicoes-por-area?nomeArea=${areaEscolhida.value}`)
                                        .then(response => {
                                            //console.log(JSON.stringify(response.data));
                                            const lista = response.data;
                                            const listaAnos = [];
                                            lista.map((e) => { listaAnos.push({ value: e.trim(), label: e }) })

                                            let listaIni = []
                                            for (let i = listaAnos.length; i > 0; i--) {
                                                listaIni.push(listaAnos[i - 1]);
                                            }

                                            console.log(JSON.stringify(listaIni))
                                            setAnoInicialOptions(listaIni);
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
                                    axios.get(`https://api-enade-analisedados-production.up.railway.app/analiseenade/consulta-todos-ies?nomeArea=${areaEscolhida.value}`)
                                        .then(response => {
                                            //console.log(JSON.stringify(response.data));
                                            //console.log(JSON.stringify(response.data))
                                            //console.log(response.data);
                                            const lista = response.data;
                                            const lista2 = [];
                                            lista.map((e) => {
                                                lista2.push({
                                                    value: e.trim(),
                                                    label: formatarPalavra(e)
                                                })
                                                //console.log(formatarPalavra(e))
                                            })
                                            setIes1Options(lista2);
                                            setIes2Options(lista2);
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                }}></Select>
                                <Select noOptionsMessage={() => { alert("Selecione uma Área") }} id="ies1" placeholder="Instituto de Ensino Superior 1" options={ies1Options} onChange={(e) => {
                                    setIes1(e.value)

                                    axios.get(`https://api-enade-analisedados-production.up.railway.app/analiseenade/consulta-municipios-por-nomearea-nomeies?nomeArea=${area}&nomeIes=${e.value}`)
                                        .then(response => {
                                            //console.log(JSON.stringify(response.data));
                                            //console.log(response.data)
                                            //console.log(" Município 1: ");
                                            //console.log("url:"+`http://localhost:8080/analiseenade/consulta-municipios-por-nomearea-nomeies?nomeArea=${area}&nomeIes=${e.value}`)
                                            //console.log(response.data);

                                            const lista = response.data;
                                            const listaMunicipios1 = [];
                                            lista.map((e) => { listaMunicipios1.push({ value: e, label: formatarPalavra(e.trim()) }) })
                                            setMunicipioIes1Options([]);
                                            setMunicipioIes1Options(listaMunicipios1);
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                }}></Select>
                                <Select noOptionsMessage={() => {
                                    if (ies1 == '') {
                                        alert("Selecione uma Ies 1");
                                    } else {
                                        alert("Selecionae uma Área");
                                    }
                                }} id="municipioies1" placeholder="Município IES 1" options={municipioIes1Options} onChange={(e) => { setMunicipioIes1(e.value) }}></Select>
                            </div>
                            <div id="filtros2">
                                <Select noOptionsMessage={() => { alert("Selecione uma Área") }} id="anoinicial" placeholder="Ano Inicial" options={anoInicialOptions} onChange={(e) => { setAnoInicial(e.value) }}></Select>
                                <Select noOptionsMessage={() => { alert("Selecione uma Área") }} id="anofinal" placeholder="Ano Final" options={anoFinalOptions} onChange={(e) => { setAnoFinal(e.value) }}></Select>
                                <Select noOptionsMessage={() => { alert("Selecione uma Área") }} id="ies2" placeholder="Instituto de Ensino Superior 2" options={ies2Options} onChange={(e) => {
                                    setIes2(e.value)

                                    axios.get(`https://api-enade-analisedados-production.up.railway.app/analiseenade/consulta-municipios-por-nomearea-nomeies?nomeArea=${area}&nomeIes=${e.value}`)
                                        .then(response => {
                                            //console.log(JSON.stringify(response.data));
                                            const lista = response.data;
                                            const listaMunicipios2 = [];
                                            lista.map((e) => { listaMunicipios2.push({ value: e, label: formatarPalavra(e.trim()) }) })
                                            setMunicipioIes2Options([]);
                                            setMunicipioIes2Options(listaMunicipios2);
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        });
                                }}></Select>
                                <Select noOptionsMessage={() => {
                                    if (ies2 == '') {
                                        alert("Selecione uma Ies 2");
                                    } else {
                                        alert("Selecione uma Área");
                                    }
                                }} id="municipioies2" placeholder="Município IES 2" options={municipioIes2Options} onChange={(e) => { setMunicipioIes2(e.value) }}></Select>
                            </div>
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
                                //console.log(anoInicial)

                                if (ies1 === '' ||
                                    ies2 === '' ||
                                    municipioIes1 === '' ||
                                    municipioIes2 === '' ||
                                    anoInicial === '' ||
                                    anoFinal === '' ||
                                    area === '') {
                                    alert("Preencha os campos!!");
                                } else {
                                    setGrafico1(<GraficoComparacaoNotas
                                        anoInicial={anoInicial}
                                        anoFinal={anoFinal}
                                        municipioIes1={municipioIes1}
                                        municipioIes2={municipioIes2}
                                        nomeIes1={ies1}
                                        nomeIes2={ies2}
                                        area={area}></GraficoComparacaoNotas>)

                                    setGrafico2(<GraficoPizza />)

                                    setGrafico3(<GraficoIndices
                                        anoInicial={anoInicial}
                                        anoFinal={anoFinal}
                                        municipioIes1={municipioIes1}
                                        municipioIes2={municipioIes2}
                                        nomeIes1={ies1}
                                        nomeIes2={ies2}
                                        area={area} />)
                                    setGrafico4(<GraficoIndices2
                                        anoInicial={anoInicial}
                                        anoFinal={anoFinal}
                                        municipioIes1={municipioIes1}
                                        municipioIes2={municipioIes2}
                                        nomeIes1={ies1}
                                        nomeIes2={ies2}
                                        area={area} />)
                                }

                            }}> Consultar </button>
                        </div>
                    </div>
                </div>
                <div id="pc-content">
                    {/* <GraficoComparacaoNotas></GraficoComparacaoNotas> */}
                    {grafico1}
                    <div id="grafico2" style={{ color: '#7D7676', fontFamily: 'sans-serif' }}>
                        <font> Para consultar, informe todas as informações no filtro a cima, iniciando com
                            a Área do Curso, após todos os dados informados aperte no botão "Consultar" e com isso
                            será gerado gráficos de acordo com os dados consultados no banco.
                        </font>
                        {/* ssss
                        <Select options={[
                            { value: 'chocolate', label: 'Chocolate' },
                            { value: 'strawberry', label: 'Strawberry' }
                        ]}></Select> */}
                    </div>
                    <div id="grafico3" style={{
                        width: "500px",
                        height: "300px",
                        display: "flex",
                        position: "relative"
                    }}>
                        {/* <font style={{position: 'absolute', top: 0, left: '44%', fontSize: '20px'}}> Ano 2021 </font> */}
                        {/* {grafico2} */}
                        {grafico3}

                    </div>

                    <div id="grafico4" style={{
                        width: "500px",
                        height: "300px",
                        display: "flex",
                        position: "relative"
                    }}>
                        {grafico4}
                        {/* {grafico3} */}

                    </div>

                    {/* <div id="grafico5" style={{
                        width: "400px",
                        height: "350px",
                        display: "flex",
                        position: "relative"
                    }}>
                        <GraficoPizza></GraficoPizza>
                    </div> */}
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
                <div style={{
                    height: '200px',
                    background: 'black',
                    marginTop: '200px'
                }}>

                </div>
            </div>
        </div>

    )

}