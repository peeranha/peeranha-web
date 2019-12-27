import React from 'react';
import * as routes from 'routes-config';
import Questions from 'containers/Questions';

/* eslint react/prop-types: 0 */
export default ({ match }) => (
  <Questions parentPage={routes.feed()} match={match} />
);
