import React from 'react';
import Menu from '../components/Header/Menu';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'; 

const EventsListMainPage= (props) => {

    let renderPageHeader=()=> {
        let TITLE ='Listados de eventos';

        return (
            <Helmet>
                <title> { TITLE } </title>
            </Helmet>
        );
    }

    return (
      <div className="page-list">
        {renderPageHeader()}
        <Menu  action={{list:true}}/>
        <div className="ui list list-categories">
            <div className="item">
                <i className="map marker alternate icon"></i>
                <div className="content">
                    <Link to ="/eventos/listados/distritos" className="header">Eventos por distrito</Link>
                </div>
            </div>
            <div className="item">
                <i className="map outline alternate icon"></i>
                <div className="content">
                    <Link to ="/eventos/listados/centros" className="header">Eventos por centro</Link>
                </div>
            </div>
            <div className="item">
                <i className="sticky note alternate icon"></i>
                <div className="content">
                    <Link to ="/eventos/listados/categorias" className="header">Eventos por categoría</Link>
                </div>
            </div>
        </div>
      </div>
  
    );
  

}

export default EventsListMainPage;