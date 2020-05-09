import React from 'react';
import { Link } from 'react-router-dom'
import slugify from 'slugify';

function LocationItem(props) {
    let location = props.location; 
    if(!location) {
        return ""
    }
    let locationNameUrl = slugify(location.name, {lower:true}); 
    let locationLink = `/lugar/${locationNameUrl}/${location.id}`;
    let locationDistrict =  `/distrito/${location.district}`;
    return (
        <div className="meta">
            <i className="map signs outline icon"></i>
        <span> en&nbsp; 
            <Link to={locationLink}>{location.name}</Link>,&nbsp;  
            <Link  to={locationDistrict}>{location.district}</Link>
        </span>
        </div>
    )
}


export default LocationItem;