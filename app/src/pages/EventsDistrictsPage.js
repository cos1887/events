import React from 'react';
import EventList from '../components/Event/EventsList';

import Menu from '../components/Header/Menu';
import { Helmet } from 'react-helmet';
const EventsDistrictsPage= (props) => {

    let district = props.match.params.id; 
    let filters = {districts:district}; 

    let renderPageHeader=()=> {
      return (
        <Helmet>
          <title> Eventos en el distrito: { district } </title>
        </Helmet>
      )
    }
    let renderHeader=()=> {
        return (
            <h2 className="ui header">
                <i className="map marker alternate icon"></i>
                <div className="content">
                 Eventos en "{district}"
                </div>
            </h2>); 
    }

    return (
      <div className="page-districts page">
        {renderPageHeader()}
        <Menu  />
        <div className="ui grid">
            <div className="nine wide column main-column">
             {renderHeader()}
            </div>
            <div className="nine wide column main-column">
              <EventList filters={filters}/>
            </div>

        </div>
      </div>
  
    );
  

}

export default EventsDistrictsPage;