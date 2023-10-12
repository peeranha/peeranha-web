import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/common/Button';
import { styled } from './Banner.styled';

type BannerProps = {
  profileInfo: object;
  redirectToAskQuestionPage: () => void;
  showLoginModalWithRedirectToAskQuestionPage: () => void;
};
const ButtonWithLogin = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <Button onClick={onClick} className="mt24" css={styled.button}>
      {t('common.askQuestion')}
    </Button>
  );
};

const Banner: React.FC<BannerProps> = ({ redirectToAskQuestionPage }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div css={styled.banner}>
      <div className="df fdc jcc" css={styled.container}>
        <div className="df fdc jcc aic tc">
          <h3 css={styled.bannerHeader}>{t('common.noResultsFound')}</h3>
          <p className="fz16" css={styled.text}>
            {t('common.askingCommunity')}
          </p>
          <ButtonWithLogin onClick={redirectToAskQuestionPage} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
