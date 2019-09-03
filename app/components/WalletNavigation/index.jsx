import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import { TEXT_PRIMARY } from 'style-constants';
import pencilIcon from 'images/pencil.svg?inline';

import A from 'components/A';
import Span from 'components/Span';
import { Nav, BaseStyled } from 'components/UserNavigation';
import NavigationButton from 'components/Button/Contained/Navigation';
import SendTokens from 'containers/SendTokens';

const WalletNavigation = ({ userId }) => {
  const path = window.location.pathname + window.location.hash;

  return (
    <BaseStyled position="top" className="d-flex justify-content-between">
      <Nav>
        <A to={routes.userWallet(userId)} href={routes.userWallet(userId)}>
          <NavigationButton isLink={path !== routes.userWallet(userId)}>
            <FormattedMessage {...messages.wallet} />
          </NavigationButton>
        </A>
      </Nav>

      <SendTokens>
        <Span className="d-flex align-items-center" color={TEXT_PRIMARY}>
          <img className="mr-2" src={pencilIcon} alt="icon" />
          <FormattedMessage {...messages.sendTokens} />
        </Span>
      </SendTokens>
    </BaseStyled>
  );
};

WalletNavigation.propTypes = {
  userId: PropTypes.string,
};

export default React.memo(WalletNavigation);
