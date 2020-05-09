import React from 'react'
import _ from 'lodash'
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/index'

import Menu from '../components/Header/Menu';
import SimpleList from '../components/BasicUi/SimpleList';


const TITLE = 'Eventos por categoría'; 

class EvensListCategoriesPage extends React.Component {
  
  componentDidMount() {
    this.props.fetchCategories();
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
        <div className="page-list-categories" >
            {this.renderPageHeader()}
            <Menu  action={{list:true}}/>
            <SimpleList 
                title = {TITLE}
                icon = "tags"
                data = {this.props.categories}
                text="value"
                id="value"
                path="/categoria/"
            />
        </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    categories: Object.values(state.categories),
  }
}

export default connect(
  mapStateToProps,
  { fetchCategories}
)(EvensListCategoriesPage)
