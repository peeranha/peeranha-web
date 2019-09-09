import React from 'react';
import { FormattedMessage } from 'react-intl';

import Wrapper from 'components/Header/Complex';
import H3 from 'components/H3';

import commonMessages from 'common-messages';
import messages from 'containers/Profile/messages';

const Header = () => (
  <Wrapper position="bottom">
    <H3>
      <FormattedMessage {...commonMessages.you} />{' '}
      <FormattedMessage {...messages.answered} />
    </H3>
  </Wrapper>
);

export default Header;
