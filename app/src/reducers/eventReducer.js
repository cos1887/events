
import {
  FETCH_EVENT
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_EVENT:
      return action.payload;
    default:
      return state;
  }
}