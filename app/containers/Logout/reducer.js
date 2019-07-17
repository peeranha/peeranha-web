import { fromJS } from 'immutable';

export const initialState = fromJS({});

function logoutReducer(state = initialState) {
  return state;
}

export default logoutReducer;
