import React from 'react';


function Maps(props) {

    const URL_MAP = 'https://maps.googleapis.com/maps/api/staticmap'; 
    const KEY = 'AIzaSyBUXqc_X6bylBgbjKCsfLknAT1Lf1I52hg'; 
    const URL_GOOGLE ='https://www.google.es/maps'
    const HEIGHT = props.height || 800; 
    const WITDTH = props.width || 200; 
    const VIEW_TEXT = (props.viewtext===false) ? false: true;
    const VIEW_TITLE = (props.viewtitle===false) ? false: true;
    const ZOOM = 14; 
    const COLOR = 'red'
    const lat = props.latitude; 
    const long = props.longitude; 
    const nameLocation = props.name; 
    const srcGoogleMaps =`${URL_GOOGLE}?q=${lat},${long}`
    const srcMap = `${URL_MAP}?center=${lat}7%2c${long}&markers=color:${COLOR}|${lat},${long}&zoom=${ZOOM}&size=${HEIGHT}x${WITDTH}&key=${KEY}`
    
    if(!lat || !long) {return ""}; 

    let getMap =()=> {
        return (<div className="image">
            <img 
                src={srcMap}
                alt = {nameLocation}
            />
        </div>); 
    }
    let getInfoLocation =()=> {
        if(!VIEW_TEXT) { return "" }

        const locationName = (VIEW_TITLE)? (<a className="header">{props.name}
            <div className="meta">
                <span className="date">{props.district}</span>
            </div></a>):""; 

        const locationdir= ( <div className="description">
                {props.street}, {props.postalCode}, {props.city}
            </div>)

        return (
            <div className="content">
                {locationName}
                {locationdir}
            </div>
        ); 
    }
    let getAction =()=> {
        return ( <div className="extra content">
    
            <a className="ui " href={srcGoogleMaps} target='blank'>
                <i className="map icon"></i>  Ver en Google 
            </a>
        </div>); 
    }

    
    return (
        <div className="wrapper-map">
            <h2 className="header">Ubicación</h2>
            <div className="ui card">
                {getMap()}
                {getInfoLocation()}
                {getAction()}
            </div>
        </div>

    )
}


export default Maps;