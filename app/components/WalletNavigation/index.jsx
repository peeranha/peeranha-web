import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import A from 'components/A';
import Wrapper from 'components/Header/Complex';
import NavigationButton from 'components/Button/Contained/Navigation';

const WalletNavigation = ({ userId }) => {
  const path = window.location.pathname + window.location.hash;

  return (
    <Wrapper position="top">
      <ul>
        <A to={routes.userWallet(userId)}>
          <NavigationButton islink={path !== routes.userWallet(userId)}>
            <FormattedMessage {...messages.wallet} />
          </NavigationButton>
        </A>
        <A to={routes.userBoost(userId)}>
          <NavigationButton islink={path !== routes.userBoost(userId)}>
            <FormattedMessage {...messages.boost} />
          </NavigationButton>
        </A>
      </ul>
    </Wrapper>
  );
};

WalletNavigation.propTypes = {
  userId: PropTypes.string,
};

export default React.memo(WalletNavigation);
