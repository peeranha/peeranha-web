import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import Button from './ContainedButton';

const routeToFeed = (): void => {
  createdHistory.push(routes.feed());
};

const ClickRouteToFeed: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="df">
      <Button className="getStarted" onClick={routeToFeed}>
        {t('about.getStarted')}
      </Button>
    </div>
  );
};

ClickRouteToFeed.propTypes = {
  button: PropTypes.object,
};

export default ClickRouteToFeed;
