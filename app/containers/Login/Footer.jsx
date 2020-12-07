import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isMobile from 'ismobilejs';

import { TEXT_DARK, BG_LIGHT, TEXT_SECONDARY } from 'style-constants';
import messages from 'common-messages';

import scatterLogo from 'images/scatterLogo.svg?inline';
import sqrlLogo from 'images/sqrl.svg?inline';
import wombatLogo from 'images/wombat.png';
import keycatLogo from 'images/keycat.svg?external';
import keycatTextLogo from 'images/keycatText.svg?external';

import Button from 'components/Button/Outlined/SecondaryLarge';
import Icon from 'components/Icon';
import IdontHaveAnAccount from './IdontHaveAnAccount';

const Box = styled.div`
  margin-top: 15px;
  margin-left: -30px;
  margin-right: -30px;
  margin-bottom: -30px;
  padding: 30px 30px 20px 30px;

  @media only screen and (max-width: 576px) {
    padding-top: 20px;
  }
`;

const WalletsLogosStyles = css`
  display: flex;
  align-items: start;
  justify-content: center;
  background: ${BG_LIGHT};
  color: ${TEXT_DARK};
  padding: 10px;

  > img {
    &:not(:last-child) {
      margin-right: 14px;
    }

    &[alt='scatter'] {
      height: 16px;
    }

    &[alt='sqrl'] {
      height: 24px;
    }

    &[alt='wombat'] {
      height: 18px;
    }
  }
`;

export const WalletButton = styled(Button)`
  ${WalletsLogosStyles};
`;

export const KeycatButton = styled(Button)`
  ${WalletsLogosStyles};
  align-items: center;

  svg {
    fill: #222;
  }
`;

const Heading = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 14px;

  span {
    color: ${TEXT_SECONDARY};
  }
`;

export const LoginViaScatter = ({ action, processing, isMobileDevice }) => (
  <WalletButton onClick={action || null} disabled={processing}>
    {!isMobileDevice && <img src={scatterLogo} alt="scatter" />}
    {!isMobileDevice && <img src={sqrlLogo} alt="sqrl" />}
    <img src={wombatLogo} alt="wombat" />
  </WalletButton>
);

LoginViaScatter.propTypes = {
  action: PropTypes.func,
  processing: PropTypes.bool,
  isMobileDevice: PropTypes.bool,
};

export const LoginViaKeycat = ({ action, processing }) => (
  <KeycatButton onClick={action || null} disabled={processing}>
    <Icon icon={keycatLogo} width="16" height="16" className="mr-2 mb-0" />
    <Icon icon={keycatTextLogo} height="16" className="mt-1 mb-0" />
  </KeycatButton>
);

LoginViaKeycat.propTypes = {
  action: PropTypes.func,
  processing: PropTypes.bool,
};

const Footer = ({
  walletAction,
  loginWithWalletProcessing,
  showWalletSignUpProcessing,
  loginWithEmailProcessing,
  emailVerificationProcessing,
  emailChecking,
  signUpText = null,
}) => (
  <Box>
    <Heading>
      {signUpText || <FormattedMessage {...messages.loginViaWallet} />}
    </Heading>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <LoginViaScatter
        action={() => walletAction({ scatter: true })}
        processing={
          loginWithWalletProcessing ||
          showWalletSignUpProcessing ||
          emailChecking ||
          emailVerificationProcessing ||
          loginWithEmailProcessing
        }
        isMobileDevice={isMobile(window.navigator).any}
      />
      <LoginViaKeycat
        action={() => walletAction({ keycat: true })}
        processing={
          loginWithWalletProcessing ||
          showWalletSignUpProcessing ||
          emailChecking ||
          emailVerificationProcessing ||
          loginWithEmailProcessing
        }
      />
    </div>
    {!signUpText && (
      <IdontHaveAnAccount
        disabled={
          loginWithWalletProcessing ||
          loginWithEmailProcessing ||
          showWalletSignUpProcessing
        }
      />
    )}
  </Box>
);

Footer.propTypes = {
  walletAction: PropTypes.func,
  loginWithWalletProcessing: PropTypes.bool,
  showWalletSignUpProcessing: PropTypes.bool,
  loginWithEmailProcessing: PropTypes.bool,
  emailVerificationProcessing: PropTypes.bool,
  emailChecking: PropTypes.bool,
  signUpText: PropTypes.element,
};

export default React.memo(Footer);
