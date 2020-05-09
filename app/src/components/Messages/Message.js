import React from 'react';


const Message =(props) => {
    const TITLE_BY_DEFAULT = 'Aviso'; 
    const ICON_BY_DEFAULT = 'bell outline'; 
    const MSG_BY_DEFAULT = 'Se ha producido un error'; 
    
    
    let title = props.title ? props.title: MSG_BY_DEFAULT; 
    let icon = props.icon ? props.icon: ICON_BY_DEFAULT; 
    let msg = props.msg ? props.msg: TITLE_BY_DEFAULT; 
    let icoClass = `${icon} icon`;

    return (
        <div className="ui icon message">
            <i className={icoClass}></i>
            <div className="content">
                <div className="header">
                    {title}
                </div>
                <p>{msg}</p>
            </div>
        </div>
    ); 
}

export default Message;

