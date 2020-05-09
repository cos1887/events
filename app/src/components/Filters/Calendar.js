import React, { Component } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { connect } from 'react-redux'
import { fetchEvents } from '../../actions/index'

class Calendar extends Component {
    state = {
        date: [new Date(), new Date(parseInt(new Date().getTime() + 24*60*60*1000*7))]
    }

    componentWillReceiveProps(next_props) {
        let filters = next_props.events[1] || {};   
        let dates =   filters.dates 
        if(dates) {
            let init = new Date(parseInt(dates.dateStart,10))
            let end = new Date(parseInt(dates.dateEnd,10))
            this.setState({
                date: [init,end], 
                categories: filters.categories
            })
        }
    
    }
    
    onChange = date => this.setState({ date })

    search() {
        let dates = this.state.date;
        this.props.fetchEvents({
            dateStarts: new Date(dates[0]).getTime(), 
            dateEnds: new Date(dates[1]).getTime(), 
            categories: this.state.categories
        })
    }


    render() {
        return (
            <div className="data-range-picker">
                <DateRangePicker
                    onChange={this.onChange}
                    value={this.state.date}
                />
                <button onClick={()=> {this.search()}} className="ui right labeled icon button">
                    <i className="right search icon"></i>
                    <span>buscar</span>
                </button>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        events: Object.values(state.events),
    }
}

export default connect(
    mapStateToProps,
    { fetchEvents }
)(Calendar)

