import React from 'react';


const Loader =(props) => {
    const MSG_BY_DEFAULT = 'Buscando contenidos.'; 
    let msg = props.msg ? props.msg: MSG_BY_DEFAULT; 
    return (
        <div className="ui icon message">
        <i className="notched circle loading icon"></i>
        <div className="content">
            <div className="header">
            Cargando
            </div>
            <p>{msg}</p>
        </div>
        </div>
    ); 
}

export default Loader;
