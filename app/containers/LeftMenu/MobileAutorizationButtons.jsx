import React from 'react';
import { FormattedMessage } from 'react-intl';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import messages from 'common-messages';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';

export default React.memo(({ profile, isMenuVisible, showLoginModal }) => {
  if (profile || !isMenuVisible) {
    return null;
  }

  return (
    <div className="d-flex align-items-center">
      <LargeOutlinedButton onClick={showLoginModal}>
        <FormattedMessage {...messages.login} />
      </LargeOutlinedButton>

      <LargeOutlinedButton
        className="ml-2"
        onClick={() => createdHistory.push(routes.signup.email.name)}
      >
        <FormattedMessage {...messages.signUp} />
      </LargeOutlinedButton>
    </div>
  );
});
