import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isMobile from 'ismobilejs';

import { TEXT_DARK, BG_SECONDARY_SPECIAL_4, BG_LIGHT } from 'style-constants';
import messages from 'common-messages';

import scatterLogo from 'images/scatterLogo.svg?inline';
import sqrlLogo from 'images/sqrl.svg?inline';
import wombatLogo from 'images/wombat.png';

import Button from 'components/Button/Outlined/SecondaryLarge';

const Box = styled.div`
  margin-top: 30px;
  margin-left: -30px;
  margin-right: -30px;
  margin-bottom: -30px;
  padding: 30px 30px 20px 30px;
  background: ${BG_SECONDARY_SPECIAL_4};

  @media only screen and (max-width: 576px) {
    padding-top: 20px;
  }
`;

const B = Button.extend`
  background: ${BG_LIGHT};
  color: ${TEXT_DARK};
  width: 100%;
`;

const Wallets = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  padding-top: 15px;

  > img {
    &:not(:last-child) {
      margin-right: 20px;
    }

    &[alt='scatter'] {
      height: 16px;
    }

    &[alt='sqrl'] {
      height: 28px;
    }

    &[alt='wombat'] {
      height: 22px;
    }
  }
`;

export const LoginViaWallet = ({ action, processing, text, isMobileDevice }) => (
  <>
    <B onClick={action || null} disabled={!!processing}>
      {text || <FormattedMessage {...messages.loginViaWallet} />}
    </B>

    <Wallets>
      {!isMobileDevice && <img src={scatterLogo} alt="scatter" />}
      {!isMobileDevice && <img src={sqrlLogo} alt="sqrl" />}
      <img src={wombatLogo} alt="wombat" />
    </Wallets>
  </>
);

LoginViaWallet.propTypes = {
  loginWithScatter: PropTypes.func,
  loginWithScatterProcessing: PropTypes.bool,
};

export default React.memo(({ action, processing }) => (
  <Box>
    <LoginViaWallet
      action={action}
      processing={processing}
      isMobileDevice={isMobile(window.navigator).any}
    />
  </Box>
));
