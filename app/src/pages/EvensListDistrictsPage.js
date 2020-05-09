import React from 'react'
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux'
import { fetchDistricts } from '../actions/index'
import Menu from '../components/Header/Menu';

import SimpleList from '../components/BasicUi/SimpleList';
const TITLE = 'Eventos por distrito'; 

class EvensListDistrictsPage extends React.Component {
  
  componentDidMount() {
    this.props.fetchDistricts();
  }

  renderPageHeader() {
  
    return (
      <Helmet>
        <title> { TITLE } </title>
      </Helmet>
    )
  }

  
  render() {
    if(!this.props) return <div> cargando...</div>

    return (
        <div className="page-list-locations" >
            {this.renderPageHeader()}
            <Menu  action={{list:true}}/>
            <SimpleList 
                title = {TITLE}
                icon = "map marker alternate"
                data = {this.props.districts}
                text="name"
                id="name"
                path="/distrito/"
            />
        </div>

    )
  }

}

const mapStateToProps = state => {
  return {
    districts: state.districts,
  }
}

export default connect(
  mapStateToProps,
  { fetchDistricts}
)(EvensListDistrictsPage)
