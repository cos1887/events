import React from 'react';
import { Link } from 'react-router-dom'

function ButtonBasic(props) {

    let to = props.to; 
    let className = props.className; 
    let href =  props.href; 
    let text = props.text; 
    let icon = props.icon || 'info'; 
    let classButton = `${icon} ${className} circle icon`
    let button = (
          <div className="ui label">
            <i className={classButton}></i> {text}
          </div> 
      ); 

    if( to ) {
      return (<Link to={to} className="header">{button}</Link>)
    }
    return (<a  href={href} target='blank'>{button}</a>)
}

export default ButtonBasic;