import React from 'react';

import Button from 'components/common/Button';
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

  return (
    <div css={styled.banner}>
      <div className="df fdc p16" css={styled.container}>
        <div className="df jcc pt16 pb16">
          <img
            src={noSearchResults}
            css={styled.image}
            alt="no search results"
          />
        </div>
        <div className="mt24">
          <p className="fz16" css={styled.text}>
            {t('common.noSearchResults')}
          </p>
          <Button
            onClick={
              profileInfo
                ? redirectToAskQuestionPage
                : showLoginModalWithRedirectToAskQuestionPage
            }
            className="mt24"
            css={styled.button}
          >
            {t('common.askQuestion')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
