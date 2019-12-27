import React from 'react';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';

export default React.memo(() => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <FormattedMessage {...commonMessages.privacyPolicy} />
    </H3>
  </Wrapper>
));
