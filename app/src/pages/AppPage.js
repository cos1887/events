import React from 'react';
import { Helmet } from 'react-helmet';

import Calendar from '../components/Filters/Calendar';
import Districts from '../components/Filters/Districts';
import Categories from '../components/Filters/Categories';
import EventList from '../components/Event/EventsList';
import Menu from '../components/Header/Menu';

const App= () => {
  return (
      <div className="page-app" >
         <Menu action={{home:true}}/>
         <Helmet title="#EGMad" />
        <Helmet>
          <title>#EGMad</title>
          <meta name="description" content="Eventos y actividades gratuitas en Madrid" />
        </Helmet>
        <div className="ui grid">

          <div className="ten wide column main-column">
            <Calendar />
            <div className="ui divider calendar-divider"></div>
            <EventList/>
          </div>
          <div className="three wide column filters">
            <div className="ui divider"></div>
            <h3 className="ui header">
              <i className="filter icon small"></i>
              <div className="content">
                Filtros
              </div>
            </h3> 
            <div className="ui divider"></div>
            <Categories />
            <div className="ui divider"></div>
            <Districts />
            <div className="ui divider"></div>
          </div>
        </div>
    </div>

  );
     

}

export default App;