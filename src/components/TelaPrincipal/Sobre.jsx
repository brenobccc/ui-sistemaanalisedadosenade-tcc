import React from "react";
import './Sobre.css';
import Cabecalho from "../Cabecalho";

export default function Sobre(props) {
    return (
        <div id="sobre">
            <Cabecalho isSobre={props.isSobre} style={{
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
                    width: '300px',
                    height: '90%',
                    margin: 0,
                    marginRight: '5px',
                    // backgroundColor: 'orange',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: '15px'
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
                }}></Cabecalho>

            <div id="sobre-content"> 
                <div className="sobre-card"></div>
                <div className="sobre-card"></div>
                <div className="sobre-card"></div>
            </div>

        </div>
    )
}