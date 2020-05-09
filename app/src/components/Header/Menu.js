import React from 'react';
import { Link } from 'react-router-dom'

const Menu =(props) => {
    let action = props.action || {}; 
    const ACTIVE_CLASS = 'active'; 
    const HIDE_CLASS = 'hide'; 
    let homeActive = (action.home === true)? ACTIVE_CLASS:''; 
    let listActive = (action.list === true)? ACTIVE_CLASS:''; 
    let hideBack = (action.home === true)? HIDE_CLASS:''; 
    let homeClass = `item ${homeActive}`; 
    let listClass = `item ${listActive}`; 
    let backClass = `right menu ${hideBack}`; 
    const goBack = () => {
        history.back(); 
    }
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className={homeClass}>
                <i className="home icon"></i> 
            </Link>
            <Link to="/eventos/listados" className={listClass}>
                <i className="list icon"></i> 
            </Link>
            {<div className={backClass}>
                <a onClick={goBack}  className="item">
                    <i className="arrow alternate circle left icon"></i>
                </a>
            </div> }
        </div>
    );  
}

export default Menu;