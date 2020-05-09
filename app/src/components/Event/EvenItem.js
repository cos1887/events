import React from 'react'
import { Link } from 'react-router-dom'
import slugify from 'slugify';
import logoMad from '../../styles/images/logo-mad.png';
import CategoryItem from '../BasicUi/CategoryItem'
import LocationItem from '../BasicUi/LocationItem'
import DateItem from '../BasicUi/DateItem'
import ButtonBasic from '../BasicUi/ButtonBasic'
import AddToCalendar from 'react-add-to-calendar';

function EventItem(props) {
    
    let event = props.event; 
    let isDetail = props.isDetail || false; 
    let imgSrc = (event.img)? event.img: logoMad;
    let location = event.location || {}; 
    let titleLink = slugify(event.title, {lower:true}); 
    let linkTo = `/evento/${titleLink}/${event.id}`; 

    let getDescByDefault = () => {
      let textByDefatul =`"${event.title}" en  ${location.name}, ${location.district}(${location.city})`;
      if(location.name && location.district && location.city) {
        return `"${event.title}" en  ${location.name}, ${location.district}(${location.city})`;
      }
      return event.title;
    }
    
    let  getDescription =() =>{
      let cropDescription = props.cropDescription || 0; 
      let textByDefatul =getDescByDefault();
      if((event.description && isDetail) || (event.description && cropDescription && event.description.length < cropDescription  )) {
        return event.description; 
      } else if (event.description && cropDescription) {
        return event.description.substring(0,cropDescription) + '...'
      } 
      return textByDefatul; 
    }

    let  getActions=() =>{
      if(isDetail) {
        return ( <div class="actions" > 
          
          <ButtonBasic className="attached left" href={event.link} text="Ver Información oficial"icon="linkify" />
          <AddToCalendar className="attached right"  buttonLabel="Anadir a mi calendario"  event={event}/>
          
        </div>)
      } 
      return <ButtonBasic to={linkTo} text="Detalle "icon="info" />
    }

    return (
      <div className="item">     
       
        <a className="ui small image logoMad">
          <img src={imgSrc} />
        </a>
        
        <div className="middle content item-content">

          <Link to={linkTo} className="header">{event.title}</Link>
          <DateItem dateInit={event.dateStart} dateEnd={event.dateEnd} />
          <LocationItem location={event.location} />
          <CategoryItem category={event.type} />
        
          <div className="description">
            <p>{getDescription()}</p>
          </div>

          <div className="extra">
              <div className=" right floated">
                 {getActions()}
              </div>
          </div>
          </div>
      </div>
      

    ); 
  }

export default EventItem;