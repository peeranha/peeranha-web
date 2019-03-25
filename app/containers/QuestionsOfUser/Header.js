import React from 'react';
import { FormattedMessage } from 'react-intl';

import Base from 'components/Base';
import H3 from 'components/H3';

import commonMessages from 'common-messages';

const Header = /* istanbul ignore next */ () => (
  <Base position="bottom">
    <H3>
      <FormattedMessage {...commonMessages.youAsked} />
    </H3>
  </Base>
);

export default Header;
