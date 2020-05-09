import React from 'react';
import { connect } from 'react-redux'
import { fetchCategories, fetchEvents } from '../../actions/index'
import Loader from '../Loader/Loader'
import Message from '../Messages/Message'

class CheckBox extends React.Component {
  render() {
      return (
        <input type="checkbox" id={this.props.id} value={this.props.value} checked={this.props.checked}  onChange={this.props.onChange} />
      )
  }
  
}
class Categories extends React.Component {
  
  constructor(props) {
    super(props);
    this.state= { optionsChecked: [] }
  }

  changeEvent(event) {
    let checkedArray = this.state.optionsChecked;
    let selectedValue = event.target.value;

    if (event.target.checked !== false) {
      checkedArray.push(selectedValue);
      this.setState({
        optionsChecked: checkedArray
      });
    } else {
      let valueIndex = checkedArray.indexOf(selectedValue);
      checkedArray.splice(valueIndex, 1);
      this.setState({
        optionsChecked: checkedArray
      });
    }

    this._search(); 

  }

  _search() {
    let filters = this.props.events.filters || {};   
    let dates =   filters.dates 

    this.props.fetchEvents({
      dateEnds: new Date(parseInt(dates.dateEnd,10)).getTime(),
      dateStarts:  new Date(parseInt(dates.dateStart,10)).getTime(),
      categories:this.state.optionsChecked.join()
    }); 
  }

  async componentDidMount() {
    let categories = await  this.props.fetchCategories();
    categories = this.props.categories.map(category => {
      return category.value; 
    })
    this.setState({
      optionsChecked: categories
    });
  }

  renderList = () => {
    if(this.props.categories.code) { 
      return <Message title="Upsss!" msg={this.props.categories.message} />;
    }

    if(!this.props.categories.length) { 
      return <Loader />;
    }

    return this.props.categories.map(category => {
      let checked = (this.state.optionsChecked.indexOf(category.value)!==-1); 
      return (            
        <div key={category.value} className="inline field">
            <div className="ui checkbox">
              <CheckBox 
                value={category.value} 
                id={category.value} 
                checked={checked} 
                onChange={this.changeEvent.bind(this)} 
              />
              <label>{category.value}</label>
            </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="ui form">

      <h5 className="ui header">
        <i className="tags icon"></i>
        <div className="content">
          Categorias
        </div>
      </h5>
        {this.renderList()}
      </div>

    )
  }
}

const mapStateToProps = state => {
  let categories = (state.categories.code && state.events.message)? state.categories:Object.values(state.categories); 
  return {
    categories: categories, 
    events: state.events
  }
}

export default connect(
  mapStateToProps,
  { fetchCategories, fetchEvents }
)(Categories)
