import React from 'react';

import Button from 'components/common/Button';
import SuiConnectModals from 'components/SuiConnectModals';
import { isSuiBlockchain } from 'utils/sui/sui';

import noSearchResults from 'images/noSearchResults.png';
import { styled } from './Banner.styled';
import { useTranslation } from 'react-i18next';

type BannerProps = {
  profileInfo: object;
  redirectToAskQuestionPage: () => void;
  showLoginModalWithRedirectToAskQuestionPage: () => void;
};

const Banner: React.FC<BannerProps> = ({
  profileInfo,
  redirectToAskQuestionPage,
  showLoginModalWithRedirectToAskQuestionPage,
}): JSX.Element => {
  const { t } = useTranslation();

  const actionButtonWithLogin = (onClick: any) => (
    <Button onClick={onClick} className="mt24" css={styled.button}>
      {t('common.askQuestion')}
    </Button>
  );

  return (
    <div css={styled.banner}>
      <div className="df fdc p16" css={styled.container}>
        <div className="df jcc pt16 pb16">
          <img src={noSearchResults} css={styled.image} alt="no search results" />
        </div>
        <div className="mt24">
          <p className="fz16" css={styled.text}>
            {t('common.noSearchResults')}
          </p>
          {!profileInfo && isSuiBlockchain ? (
            <SuiConnectModals
              loginWithWallet={showLoginModalWithRedirectToAskQuestionPage}
              actionButtonWithLogin={actionButtonWithLogin}
            />
          ) : (
            actionButtonWithLogin(redirectToAskQuestionPage)
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
