import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import { TEXT_PRIMARY } from 'style-constants';
import sendtokensIcon from 'images/sendtokens.svg?inline';

import A from 'components/A';
import Span from 'components/Span';
import Wrapper from 'components/Header/Complex';
import NavigationButton from 'components/Button/Contained/Navigation';
import SendTokens from 'containers/SendTokens';

const WalletNavigation = ({ userId }) => {
  const path = window.location.pathname + window.location.hash;

  return (
    <Wrapper position="top">
      <ul>
        <A to={routes.userWallet(userId)}>
          <NavigationButton isLink={path !== routes.userWallet(userId)}>
            <FormattedMessage {...messages.wallet} />
          </NavigationButton>
        </A>
      </ul>

      <div className="right-panel">
        <SendTokens>
          <Span className="d-flex align-items-center" color={TEXT_PRIMARY}>
            <img className="mr-2" src={sendtokensIcon} alt="icon" />
            <FormattedMessage {...messages.sendTokens} />
          </Span>
        </SendTokens>
      </div>
    </Wrapper>
  );
};

WalletNavigation.propTypes = {
  userId: PropTypes.string,
};

export default React.memo(WalletNavigation);
