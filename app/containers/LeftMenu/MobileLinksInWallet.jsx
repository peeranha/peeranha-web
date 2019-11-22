import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import arrowDownIcon from 'images/arrowDown.svg?external';

import A from 'components/A';
import Icon from 'components/Icon';

import SendTokens from 'containers/SendTokens';

import { Button as WalletButton } from 'containers/Header/WalletDropdown';

export default React.memo(({ profile, isMenuVisible, balance }) => {
  const [visibleWalletLinks, setVisibilityWalletLinks] = useState(false);

  if (!profile || !isMenuVisible) {
    return null;
  }

  return (
    <div className="lightbg use-default-links">
      <button
        className="d-flex align-items-center justify-content-between w-100"
        onClick={() => setVisibilityWalletLinks(!visibleWalletLinks)}
      >
        <WalletButton balance={balance} />
        <Icon
          className="mr-3"
          icon={arrowDownIcon}
          width="16"
          rotate={visibleWalletLinks}
        />
      </button>

      {visibleWalletLinks && (
        <div>
          <A to={routes.userWallet(profile.user)}>
            <FormattedMessage {...messages.wallet} />
          </A>

          <SendTokens>
            <FormattedMessage {...messages.sendTokens} />
          </SendTokens>
        </div>
      )}
    </div>
  );
});
