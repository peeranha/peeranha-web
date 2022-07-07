import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from './ContainedButton';
import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import messages from './messages';

const routeToFeed = (): void => {
  createdHistory.push(routes.feed());
};

const ClickRouteToFeed: React.FC<{}> = (): JSX.Element => (
  <div className="df">
    <Button className="getStarted" onClick={routeToFeed}>
      <FormattedMessage id={messages.getStarted.id} />
    </Button>
  </div>
);

ClickRouteToFeed.propTypes = {
  button: PropTypes.object,
};

export default ClickRouteToFeed;
