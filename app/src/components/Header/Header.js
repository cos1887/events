import React from 'react';
import logo from '../../styles/images/logo.png';

const Header =() => {
    return (
        <div className="event-header ui grid">
            <div className=" nine wide column">
                <h1 className="ui header events-header">
                    <img src={logo} />
                    <div className="content">
                        #EGMad
                        <div className="sub header">Eventos y actividades gratuitas en Madrid </div>
                    </div>

                </h1>
            </div>
        </div>
    ); 
}

export default Header;