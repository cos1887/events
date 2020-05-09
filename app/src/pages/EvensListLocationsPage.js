import React from 'react'
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux'
import { fetchLocations } from '../actions/index'
import Menu from '../components/Header/Menu';

import SimpleList from '../components/BasicUi/SimpleList';
const TITLE = 'Centros organizadores de eventos'; 
class EvensListLocationsPage extends React.Component {
  
  componentDidMount() {
 
    this.props.fetchLocations();
  }

  renderPageHeader() {
  
    return (
      <Helmet>
        <title> { TITLE } </title>
      </Helmet>
    )
  }
 
  // getBasePath () {
  //   let urlName = slugify(location.name, {lower:true}); 
  //   return `/lugar/${urlName}/`; 
  // }
  
  render() {
    if(!this.props) return <div> cargando...</div>

    return (
        <div className="page-list-locations" >
            {this.renderPageHeader()}
            <Menu  action={{list:true}}/>
            <SimpleList 
                title = {TITLE}
                icon = "map outline"
                data = {this.props.locations}
                text="name"
                id="id"
                path="/lugar/+/"
            />
        </div>

    )
  }

}

const mapStateToProps = state => {
  return {
    locations: state.locations,
  }
}

export default connect(
  mapStateToProps,
  { fetchLocations}
)(EvensListLocationsPage)
