import React from 'react';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';

const Header = ({ content }) => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3">
    <H3>
      <span className="d-none d-md-inline-block">
        {content.map((item) => item.role)}
      </span>

      <span className="d-inline-block d-md-none">
        <FormattedMessage id={commonMessages.moderationHeader.id} />
      </span>
    </H3>
  </Wrapper>
);

export default React.memo(Header);
