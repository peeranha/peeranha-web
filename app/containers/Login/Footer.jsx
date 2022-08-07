import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { BG_LIGHT, TEXT_DARK, TEXT_SECONDARY } from 'style-constants';
import messages from 'common-messages';

import metaMaskLogo from 'images/mm-logo.svg?external';

import Button from 'components/Button/Outlined/SecondaryLarge';
import Icon from 'components/Icon';

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

export const LoginViaMetaMask = ({ action, processing, providerDetected }) => {
  // const redirectToMetaMask = () => {
  //   window.open('https://metamask.io/', '_blank').focus();
  // };

  return (
    <>
      <MetaMaskButton onClick={action} disabled={processing}>
        <Icon icon={metaMaskLogo} height="28" className="mr-2 mb-0" />
      </MetaMaskButton>
    </>
  );
};

LoginViaMetaMask.propTypes = {
  action: PropTypes.func,
  processing: PropTypes.bool,
};

const Footer = ({
  walletAction,
  loginWithWalletProcessing,
  metaMaskProviderDetected,
}) => {
  const { metaMaskAction } = useMemo(
    () => ({
      metaMaskAction: () => walletAction({ metaMask: true }),
    }),
    [walletAction],
  );

  return (
    <Box>
      <Heading>
        <FormattedMessage {...messages.loginViaWallet} />
      </Heading>
      <div className="d-flex">
        <LoginViaMetaMask
          action={metaMaskAction}
          processing={loginWithWalletProcessing}
          providerDetected={metaMaskProviderDetected}
        />
      </div>
    </Box>
  );
};

Footer.propTypes = {
  walletAction: PropTypes.func,
  loginWithWalletProcessing: PropTypes.bool,
  locale: PropTypes.string,
};

export default React.memo(Footer);
