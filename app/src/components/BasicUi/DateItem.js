import React from 'react';
import moment from 'moment';

function DateItem(props) {
    let dateInit = props.dateInit; 
    let dateEnd = props.dateEnd; 

    let finalDate = moment(dateInit).format('MMMM Do YYYY, h:mm')
    return (
        <div className="meta">
            <i className="calendar alternate outline icon"></i>
            <span> {finalDate}</span>
        </div>
     
    )
}

export default DateItem;