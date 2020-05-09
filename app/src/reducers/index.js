import { combineReducers } from 'redux'

import eventsReducer from './eventsReducer'
import filterCategoryReducer from './filterCategoryReducer'
import eventReducer from './eventReducer'
import locationReducer from './locationReducer'
import locationsReducer from './locationsReducer'
import districtsReducer from './districtsReducer'
export default combineReducers({
  events: eventsReducer, 
  event: eventReducer, 
  categories: filterCategoryReducer,
  locations: locationsReducer,
  location: locationReducer, 
  districts: districtsReducer
});