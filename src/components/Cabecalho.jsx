import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cabecalho(props) {
    const navigate = useNavigate();
    return (<div style={props.style}>
        <div id="head-nav" style={props.estiloNav}>
            <ul style={props.ul}>
                <li style={{
                    width: '130px',
                    height: '90%',
                    backgroundColor: '#FFFFFF',
                    listStyle: 'none',
                    borderRadius: '6px',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'black',
                    fontFamily: 'sans-serif',
                    cursor: 'pointer'
                }}>Comparar Universidades</li>
                {/* <li style={props.li}>Comparar Estados</li> */}
                <li style={props.li} onClick={() =>navigate('/sobre')}>Sobre</li>
            </ul>
        </div>
        <div id="head-title" style={props.estiloTitulo}>
            <div style={{
                // backgroundColor: 'gray',
                width: '300px',
                marginLeft: '50px',
                height: '200px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <h1 style={{
                    fontSize: 65,
                    margin: '0px',
                    marginTop: '10px',
                    fontFamily: 'sans-serif',
                    letterSpacing: '2px',
                    color: 'white'
                }}> SAEN</h1>
                <h2 style={{ 
                    margin: '0px', 
                    fontFamily: 'sans-serif',
                    color: 'white',
                    fontWeight: "lighter"
                    }}>Sistema de Análise de Dados do Exame Enade</h2>
            </div>
        </div>
    </div>);
}