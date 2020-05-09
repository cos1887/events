
import {
   FETCH_DISTRICTS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_DISTRICTS:
      return  action.payload; 
    default:
      return state;
  }
}