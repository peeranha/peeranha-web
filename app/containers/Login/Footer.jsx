import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { TEXT_DARK, BG_LIGHT, TEXT_SECONDARY } from 'style-constants';

import metaMaskLogo from 'images/mm-logo.svg?external';

import Button from 'components/Button/Outlined/SecondaryLarge';
import Icon from 'components/Icon';
import IdontHaveAnAccount from './IdontHaveAnAccount';

const Box = styled.div`
  margin: 15px -30px -30px -30px;
  padding: 30px 30px 20px 30px;

  @media only screen and (max-width: 576px) {
    padding-top: 20px;
  }
`;

const WalletButtonStyles = css`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-grow: 1;
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

export const MetaMaskButton = styled(Button)`
  ${WalletButtonStyles};
  align-items: center;
  margin-left: 10px;

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

export const LoginViaMetaMask = ({ action, processing }) => (
  <>
    <MetaMaskButton onClick={action} disabled={processing}>
      <Icon icon={metaMaskLogo} height="28" className="mr-2 mb-0" />
    </MetaMaskButton>
  </>
);

LoginViaMetaMask.propTypes = {
  action: PropTypes.func,
  processing: PropTypes.bool,
};

const Footer = ({
  walletAction,
  loginWithWalletProcessing,
  showWalletSignUpProcessing,
  loginWithEmailProcessing,
  emailVerificationProcessing,
  facebookLoginProcessing,
  emailChecking,
  signUpText = null,
  metaMaskProviderDetected,
}) => {
  const { t } = useTranslation();
  const { metaMaskAction } = useMemo(
    () => ({
      metaMaskAction: () => walletAction({ metaMask: true, t }),
    }),
    [walletAction],
  );

  const processing =
    loginWithWalletProcessing ||
    showWalletSignUpProcessing ||
    emailChecking ||
    emailVerificationProcessing ||
    loginWithEmailProcessing ||
    facebookLoginProcessing;

  return (
    <Box>
      <Heading>{signUpText || t('common.loginViaWallet')}</Heading>
      <div className="d-flex">
        <LoginViaMetaMask
          action={metaMaskAction}
          processing={processing}
          providerDetected={metaMaskProviderDetected}
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
};

Footer.propTypes = {
  walletAction: PropTypes.func,
  loginWithWalletProcessing: PropTypes.bool,
  showWalletSignUpProcessing: PropTypes.bool,
  loginWithEmailProcessing: PropTypes.bool,
  emailVerificationProcessing: PropTypes.bool,
  emailChecking: PropTypes.bool,
  signUpText: PropTypes.string,
  locale: PropTypes.string,
};

export default React.memo(Footer);
