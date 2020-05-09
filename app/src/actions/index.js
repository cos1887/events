import events from '../api/events'
import {ERRORS} from '../errors/errors'
import {
  FETCH_EVENTS,
  FETCH_EVENT, 
  FETCH_LOCATION,
  FETCH_LOCATIONS,
  FETCH_CATEGORIES, 
  FETCH_DISTRICTS
} from './types'

let responseIsOk = (response) => {
  return (response && response.data && response.data.result && response.data.resp.status ===1  && response.data.result.length > 0);
}

let handleKo = (keyError, data) => {
  let error =  ERRORS[`${keyError}_NO_DATA`] 
  data.result ={error}; 
  console.log("[Error] ", error); 
  return { type: keyError, payload: data} 
}

export const fetchEvents = (params = {}) => async dispatch => {
  let dateStart = params.dateStarts || '';
  let dateEnds = params.dateEnds || '';
  let categories = params.categories ||'';
  let location = params.location ||'';
  let districts = params.districts ||'';
  const response = await events.get(`/api/events?starts=${dateStart}&ends=${dateEnds}&categories=${categories}&districts=${districts}&location=${location}`)
  let result = response.data; 
  if ( responseIsOk(response) ) {
    dispatch({ type: FETCH_EVENTS, payload: result});
  } else {
    dispatch(handleKo(FETCH_EVENTS,result));
  }
}

export const fetchEvent = (id) => async dispatch => {
  const response = await events.get('api/events/title/'+id);
  let result = response.data.result[0]; 

  dispatch({ type: FETCH_EVENT, payload:result})
}

export const fetchCategories = (id) => async dispatch => {
  const response = await events.get('api/events/categories');
  let result = response.data.result; 

  dispatch({ type: FETCH_CATEGORIES, payload:result})
}
export const fetchDistricts = (id) => async dispatch => {
  const response = await events.get(`api/districts`);
  let result = response.data.result; 

  dispatch({ type: FETCH_DISTRICTS, payload:result})
}

export const fetchLocations = (id) => async dispatch => {
  const response = await events.get(`api/locations`);
  let result = response.data.result; 

  dispatch({ type: FETCH_LOCATIONS, payload:result})
}

export const fetchLocation = (id) => async dispatch => {
  const response = await events.get(`api/locations/${id}`);
  let result = response.data.result; 

  dispatch({ type: FETCH_LOCATION, payload:result[0]})
}