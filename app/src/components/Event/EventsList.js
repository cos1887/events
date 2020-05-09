import React from 'react'
import { connect } from 'react-redux'
import EventItem from './EvenItem'
import Loader from '../Loader/Loader'
import Message from '../Messages/Message'
import { fetchEvents } from '../../actions/index'


class EventList extends React.Component {
  
  componentDidMount() {
    let filters = this.props.filters || {}; 
    this.props.fetchEvents(filters)
  }
  renderHeader = () => {
    return ( <div className="ui tiny horizontal statistic">
      <div className="value"> {this.props.events.length} </div>
      <div className="label"> Eventos</div>
    </div>); 
  }
  renderList = () => {
    const CROP_DESCRIPTION = 150; 
    const IS_DETAIL = false; 

    if(this.props.events.error) { 
      return <Message title="Upsss!" msg={this.props.events.error.message} />;
    }

    if(!this.props.events.length) { 
      return <Loader msg="buscando eventos en Madrid"/>;
    }

    return this.props.events.map(event => {
      return (<EventItem 
        event={event} 
        key={event.id}
        cropDescription={CROP_DESCRIPTION}
        isDetail={IS_DETAIL}
      />);
    })
  }

  render() {
    return (
      <div className="ui items">
        {this.renderHeader()}
        {this.renderList()}
      </div>

    )
  }
}

const mapStateToProps = state => {
  let events = state.events || {};
  if (state.events.code && state.events.message){
    events = state.events;
  } else if (events.result){
    events = events.result; 
  }
  
  return {
    events: events
  }
}

export default connect(
  mapStateToProps,
  { fetchEvents }
)(EventList)