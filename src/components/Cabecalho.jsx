import React from "react";

export default function Cabecalho(props) {
    return (<div style={props.style}>
        <div id="head-nav" style={props.estiloNav}>
            <ul style={props.ul}>
                <li style={props.li}>Comparar Universidades</li>
                <li style={props.li}>Comparar Estados</li>
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
                }}>Sobre</li>
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