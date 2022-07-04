import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from './ContainedButton';
import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import messages from './messages';

const routeToFeed = () => {
  createdHistory.push(routes.feed());
};

const ClickRouteToFeed = () => (
  <div className="d-flex">
    <Button className="getStarted" onClick={routeToFeed}>
      <FormattedMessage id={messages.getStarted.id} />
    </Button>
  </div>
);

ClickRouteToFeed.propTypes = {
  button: PropTypes.object,
};

export default ClickRouteToFeed;
