import React from 'react';
import { FormattedMessage } from 'react-intl';

import H3 from 'components/H3';
import Wrapper from 'components/Header/Complex';

import commonMessages from 'common-messages';

const Header = () => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3" position="bottom">
    <H3>
      <FormattedMessage {...commonMessages.youAsked} />
    </H3>
  </Wrapper>
);

export default Header;
