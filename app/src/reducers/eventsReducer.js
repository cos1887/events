
import {
  FETCH_EVENTS
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      let playload = action.payload || {};
      let resp = playload.resp|| {};
      let filters = resp.filters; 
      return  {result:playload.result , filters:filters, error: playload.error  };
    default:
      return state;
  }
}