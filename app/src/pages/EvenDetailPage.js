import React from 'react'
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux'
import { fetchEvent } from '../actions/index'
import GoogleMaps from '../components/GoogleMaps/GoogleMaps'; 
import EventItem from '../components/Event/EvenItem'
import Menu from '../components/Header/Menu';

class EventDetail extends React.Component {
  
  componentDidMount() {
    let idDetail = this.props.match.params.id; 
    this.props.fetchEvent(idDetail);
  }

  renderPageHeader() {
    let event = this.props.event; 
    return (
      <Helmet>
        <title> {event.title } </title>
        <meta property="og:site_name" content="EgMad" ></meta>
        <meta property="og:title" content={event.title}></meta>
        <meta property="og:description" content={event.description} ></meta>
        <meta property="og:image" itemprop="image" content={event.img}></meta>
      </Helmet>
    )
  }

  renderDetail= () => {
    let event = this.props.event; 
    return (
      <div className="ui items">
        <EventItem event={event} isDetail={true}/>
      </div>    

    ); 
  }

  renderMaps = () => {
    if(!this.props.event.id) return <div> cargando...</div>
    let event = this.props.event; 

    return (
      <GoogleMaps {...this.props.event.location} />  

    ); 
  }
  
  render() {
    if(!this.props.event.id) return <div> cargando...</div>
    
    return (
        <div className="page-detail item-detail" >
          <Menu  />
         {this.renderPageHeader()}
          <div className="ui grid content">
              <div className="nine wide column main-column">
                {this.renderDetail()}
              </div>
              <div className="four wide gmaps">
                {this.renderMaps()}
              </div>
          </div>
        </div>

    )
  }

}

const mapStateToProps = state => {
  return {
    event: state.event,
  }
}

export default connect(
  mapStateToProps,
  { fetchEvent}
)(EventDetail)
