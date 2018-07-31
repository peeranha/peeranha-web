import Immutable from 'immutable';

import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = Immutable.fromJS({
  location: null,
});

export default (state = initialState, { type, payload } = {}) => {
  if (type === LOCATION_CHANGE) {
    return state.set('location', payload);
  }

  return state;
};
