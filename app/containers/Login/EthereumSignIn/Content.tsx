import React from 'react';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';

import { styles } from 'containers/Login/Login.styled';
import Button from 'components/Button/Contained/InfoLarge';

import { Wallet } from 'icons/index';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

export interface EthereumLoginProps {
  signInWithEmailProcessing: boolean;
  loginWithEthereumDispatch: ({ isTorus }: { isTorus: boolean }) => void;
  hideSignInModalDispatch: () => void;
}

const Content = ({
  signInWithEmailProcessing,
  loginWithEthereumDispatch,
  hideSignInModalDispatch,
}: EthereumLoginProps) => {
  const { t } = useTranslation();

  const WalletLoginButton = () => (
    <Button css={styles.walletButton} onClick={loginWithEthereumDispatch}>
      <Wallet />
      {t('login.connectWithWallet')}
    </Button>
  );

  const connect = async () => {
    hideSignInModalDispatch();
    loginWithEthereumDispatch({ isTorus: true });
  };

  return (
    <div
      css={{
        paddingTop: '24px',
      }}
    >
      <Button css={{ width: '100%' }} onClick={connect} disabled={signInWithEmailProcessing}>
        Log in with email, Google, or social media
      </Button>

      <div css={styles.divider}>
        <hr css={styles.dividerLine} />
        <span css={{ ...styles.dividerText, ...(graphCommunity && { color: '#E1E1E4' }) }}>
          {t('common.orDivider')}
        </span>
        <hr css={styles.dividerLine} />
      </div>

      <WalletLoginButton />
    </div>
  );
};

export default Content;
