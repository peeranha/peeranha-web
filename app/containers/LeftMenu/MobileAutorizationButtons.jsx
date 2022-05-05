import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';

export default ({ profile, isMenuVisible, showLoginModal }) => {
  if (profile || !isMenuVisible) {
    return null;
  }

  return (
    <div className="d-flex align-items-center">
      <LargeOutlinedButton onClick={showLoginModal}>
        <FormattedMessage id={messages.login.id} />
      </LargeOutlinedButton>
    </div>
  );
};
