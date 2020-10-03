import React from 'react';
import EventList from '../components/Event/EventsList';
import Menu from '../components/Header/Menu';
import { Helmet } from 'react-helmet';
import { getCategoryIcon } from '../helpers/categoryHelper'
const EventsCategoriesPage= (props) => {

    let id = props.match.params.id; 
    let filters = {categories:id}; 

    let renderPageHeader=()=> {
      return (
        <Helmet>
          <title> Eventos por categoria: { id } </title>
        </Helmet>
      )
    }
    let renderHeader=()=> {
    
        let icon = getCategoryIcon(id); 
        let iconHeaderTitle = `${icon} icon`

        return (
            <h2 className="ui header">
                <i className={iconHeaderTitle}></i>
                <div className="content">
                 {id}
                </div>
            </h2>); 
    }

    return (
      <div className="page-categories page">
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

export default EventsCategoriesPage;