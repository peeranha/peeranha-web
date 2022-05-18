import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import { TEXT_PRIMARY } from 'style-constants';
import sendtokensIcon from 'images/sendtokens.svg?external';

import A from 'components/A';
import Span from 'components/Span';
import Wrapper, {
  SubHeaderWrapperRightPanel as WrapperRightPanel,
} from 'components/Header/Complex';
import NavigationButton from 'components/Button/Contained/Navigation';
import { IconMd } from 'components/Icon/IconWithSizes';
import { showSendTokensModal } from 'containers/SendTokens/actions';

const WalletNavigation = ({ userId, showSendTokensModalDispatch }) => {
  const path = window.location.pathname + window.location.hash;

  return (
    <Wrapper position="top">
      <ul>
        <A to={routes.userWallet(userId)}>
          <NavigationButton islink={path !== routes.userWallet(userId)}>
            <FormattedMessage id={messages.wallet.id} />
          </NavigationButton>
        </A>
        <A to={routes.userBoost(userId)}>
          <NavigationButton islink={path !== routes.userBoost(userId)}>
            <FormattedMessage id={messages.boost.id} />
          </NavigationButton>
        </A>
      </ul>

      <WrapperRightPanel className="right-panel">
        <button onClick={showSendTokensModalDispatch} type="button">
          <Span className="d-flex align-items-center" color={TEXT_PRIMARY}>
            <IconMd className="mr-2" icon={sendtokensIcon} />
            <FormattedMessage id={messages.sendTokens.id} />
          </Span>
        </button>
      </WrapperRightPanel>
    </Wrapper>
  );
};

WalletNavigation.propTypes = {
  userId: PropTypes.string,
  showSendTokensModalDispatch: PropTypes.func,
};

export default React.memo(
  connect(null, (dispatch) => ({
    showSendTokensModalDispatch: bindActionCreators(
      showSendTokensModal,
      dispatch,
    ),
  }))(WalletNavigation),
);
