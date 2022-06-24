import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from './ContainedButton';
import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import messages from './messages';

const ClickRouteToFeed = () => (
  <div className="d-flex">
    <Button
      className="getStarted"
      onClick={() => createdHistory.push(routes.feed())}
    >
      <FormattedMessage {...messages.getStarted} />
    </Button>
  </div>
);

ClickRouteToFeed.propTypes = {
  button: PropTypes.object,
};

export default React.memo(ClickRouteToFeed);
