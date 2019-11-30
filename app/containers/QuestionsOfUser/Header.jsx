import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import H3 from 'components/H3';
import Wrapper from 'components/Header/Complex';

import commonMessages from 'common-messages';

const Header = ({ userId, account, displayName }) => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3" position="bottom">
    <H3>
      <FormattedMessage
        {...commonMessages[
          account && userId === account ? 'youAsked' : 'somebodyAsked'
        ]}
        values={{
          account: displayName,
        }}
      />
    </H3>
  </Wrapper>
);

Header.propTypes = {
  account: PropTypes.string,
  userId: PropTypes.string,
  displayName: PropTypes.string,
};

export default React.memo(Header);
