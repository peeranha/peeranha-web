import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import commonMessages from 'common-messages';
import P from 'components/P';
import H4 from 'components/H4';

import loginMessages from './messages';

const Box = styled.header`
  h4 {
    padding-bottom: 35px;
    text-align: center;
  }

  p {
    padding-bottom: 15px;
  }

  @media only screen and (max-width: 576px) {
    h4 {
      padding-bottom: 15px;
    }
  }
`;

export default () => (
  <Box>
    <H4>
      <FormattedMessage id={commonMessages.login.id} />
    </H4>

    <P>
      <FormattedMessage id={loginMessages.authUserHasMore.id} />
    </P>
  </Box>
);
