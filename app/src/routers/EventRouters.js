import React from 'react'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import AppPage from '../pages/AppPage'
import EvenDetailPage from '../pages/EvenDetailPage'
import EventsLocationsPage from '../pages/EventsLocationsPage';
import EventsCategoriesPage from '../pages/EventsCategoriesPage';
import EventsDistrictsPage from '../pages/EventsDistrictsPage';
import EventsListMainPage from '../pages/EventsListMainPage';
import EvensListLocationsPage from '../pages/EvensListLocationsPage';
import EvensListCategoriesPage from '../pages/EvensListCategoriesPage';
import EvensListDistrictsPage from '../pages/EvensListDistrictsPage';

const EventRouters= () => {
    return (
        <Router>
            <div>
                <Route path="/" exact component={AppPage} />
                <Route path="/evento/:title/:id"  component={EvenDetailPage} />
                <Route path="/lugar/:location/:id"  component={EventsLocationsPage} />
                <Route path="/categoria/:id"  component={EventsCategoriesPage} />
                <Route path="/distrito/:id"  component={EventsDistrictsPage} />
                <Route path="/eventos/listados"  exact component={EventsListMainPage} />
                <Route path="/eventos/listados/centros"  component={EvensListLocationsPage} />
                <Route path="/eventos/listados/categorias"  component={EvensListCategoriesPage} />
                <Route path="/eventos/listados/distritos"  component={EvensListDistrictsPage} />
            </div>
        </Router>
    );
}

export default EventRouters;