import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import Button from './ContainedButton';
import i18next from 'app/i18n';

const ClickRouteToFeed: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const baseUrl = i18next.language === 'en' ? '' : `/${i18next.language}`;

  const routeToFeed = (): void => {
    createdHistory.push(baseUrl + routes.feed());
  };

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
