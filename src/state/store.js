import { createStore as createStoreImpl, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';

import * as reducers from 'state/reducers';

export function createStore(history) {
  const middlewares = [
    routerMiddleware(history),
  ];

  const store = createStoreImpl(
    combineReducers({
      ...reducers,
    }),
    Immutable.Map(),
    applyMiddleware(...middlewares),
  );

  return store;
}
