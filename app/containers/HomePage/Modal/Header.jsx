import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import messages from '../messages';

const Box = styled.header`
  h4 {
    padding-bottom: 35px;
    text-align: center;
  }

  @media only screen and (max-width: 576px) {
    h4 {
      padding-bottom: 15px;
    }
  }
`;

export default () => (
  <Box>
    <h4>
      <FormattedMessage {...messages.beTheFirstOne} />
    </h4>
  </Box>
);
