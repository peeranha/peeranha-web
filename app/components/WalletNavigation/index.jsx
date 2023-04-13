import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';

import A from 'components/A';
import Wrapper from 'components/Header/Complex';
import NavigationButton from 'components/Button/Contained/Navigation';

const WalletNavigation = ({ userId }) => {
  const { t } = useTranslation();
  const path = window.location.pathname + window.location.hash;

  return (
    <Wrapper position="top">
      <ul>
        <A to={routes.userWallet(userId)}>
          <NavigationButton islink={path !== routes.userWallet(userId)}>
            {t('common.wallet')}
          </NavigationButton>
        </A>
        <A to={routes.userBoost(userId)}>
          <NavigationButton islink={path !== routes.userBoost(userId)}>
            {t('common.boost')}
          </NavigationButton>
        </A>
      </ul>
    </Wrapper>
  );
};

WalletNavigation.propTypes = {
  userId: PropTypes.string,
};

export default WalletNavigation;
