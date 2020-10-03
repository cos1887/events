import React from 'react';
import { connect } from 'react-redux'
import EventList from '../components/Event/EventsList';
import { fetchLocation } from '../actions/index'
import GoogleMaps from '../components/GoogleMaps/GoogleMaps'; 
import Menu from '../components/Header/Menu';
import { Helmet } from 'react-helmet';

class EventsLocations extends React.Component {
  
  componentDidMount() {
    let id = this.props.match.params.id; 
    this.filters = {location:this.props.match.params.id}; 
    this.props.fetchLocation(id)
  }

  renderPageHeader() {
    return (
      <Helmet>
        <title> Eventos en { this.props.location.name } </title>
      </Helmet>
    ); 
  }
  renderHeader() {
    let location = this.props.location;  
  
    return (
      <h1 className="ui header">
        <i className="map outline icon"></i>
        <div className="content">
          {location.name}
        </div>
      </h1>); 
  }
  renderMaps = () => {
    const HEIGHT = 600; 
    let VIEW_MAP_TEXT =true; 
    let VIEW_MAP_TITLE =false; 
    return (
      <div className="gmaps">
        <GoogleMaps  
          height={HEIGHT} 
          viewtext={VIEW_MAP_TEXT}  
          viewtitle={VIEW_MAP_TITLE}  
          {...this.props.location} 
        />  
      </div>

    ); 
  }
  render() {
    if(!this.filters) return <div> </div>
    return (
      <div className="page-location page"> 
         {this.renderPageHeader()}
        <Menu  action={{list:true}}/>
        <div className="ui grid">
            <div className="nine wide column main-column">
             {this.renderHeader()}
             {this.renderMaps()}
            </div>
            <div className="nine wide column main-column">
              <EventList filters={this.filters}/>
            </div>

        </div>
      </div>
  
    );
  }

}

const mapStateToProps = state => {
  let location = state.location || {};

  return {
    location: location
  }
}

export default connect(
  mapStateToProps,
  { fetchLocation }
)(EventsLocations)
