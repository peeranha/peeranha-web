import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import scatterLogo from 'images/scatterLogo.svg?inline';

import SecondaryLargeButton from 'components/Button/Outlined/SecondaryLarge';
import P from 'components/P';

import signupMessages from 'containers/SignUp/messages';

const Box = styled.div`
  padding-top: 40px;

  @media only screen and (max-width: 576px) {
    padding-top: 20px;
  }
`;

const Footer = ({ loginWithScatter, loginWithScatterProcessing }) => (
  <Box>
    <P fontSize="14" className="text-center text-uppercase mb-3">
      <FormattedMessage {...signupMessages.or} />
    </P>

    <SecondaryLargeButton
      className="w-100"
      onClick={loginWithScatter}
      disabled={loginWithScatterProcessing}
    >
      <img src={scatterLogo} alt="scatter logo" />
    </SecondaryLargeButton>
  </Box>
);

Footer.propTypes = {
  loginWithScatter: PropTypes.func,
  loginWithScatterProcessing: PropTypes.bool,
};

export default React.memo(Footer);
