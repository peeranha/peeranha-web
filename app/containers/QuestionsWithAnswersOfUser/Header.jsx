import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import Wrapper from 'components/Header/Complex';
import H3 from 'components/H3';

const Header = ({ account, userId, displayName }) => (
  <Wrapper className="mb-to-sm-0 mb-from-sm-3" position="bottom">
    <H3>
      <FormattedMessage
        {...commonMessages[
          account && userId === account ? 'youAnswered' : 'somebodyAnswered'
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
