import React from 'react';
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Loader from '../Loader/Loader'
import Message from '../Messages/Message'
import { getCategoryIcon } from '../../helpers/categoryHelper'
import slugify from 'slugify';

class SimpleList extends React.Component {
  

    renderHeader() {
        let icon = this.props.icon;  
        let iconClass = `${icon} icon`; 
        return (
            <h2 className="ui header">
                <i className={iconClass}></i>
                <div className="content">
                {this.props.title}
                </div>
            </h2>); 
    }

    renderList= () => {
      
      if(this.props.data.error) { 
          return <Message title="Upsss!" msg={this.props.events.error.message} />;
      }
    
      if(_(this.props.data).isEmpty()) { 
          return <Loader msg="Cargando"/>;
      }
  
      return this.props.data.map(item => {
        const value = this.props.text; 
        const id = this.props.id; 
        const path = this.props.path; 
        const itemValue = item[value]; 
        const urlValue = slugify(item[id])
        const to = `${path}${urlValue}`; 
        const icon = getCategoryIcon(itemValue);
        const iconClass= `${icon} icon`
        return (
            <div className="item" key={item[id]}>
                <i className={iconClass}></i>
                <div className="content">
                    <Link to={to}> {itemValue} </Link>
                </div>
            </div>
        ); 
      })
    }
    
    render() {

        return (
            <div className="page-list-generic">
                {this.renderHeader()}
                <div className="ui list">
                    {this.renderList()}
                </div>
            </div>
        )
    }
  
  }

export default SimpleList;