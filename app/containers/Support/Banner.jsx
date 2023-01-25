import React from 'react';
import { useTranslation } from 'react-i18next';
import { BORDER_SECONDARY } from 'style-constants';

import letterSmile from 'images/letter-smile.svg?inline';

import Banner from 'components/Banner/Transparent';

const BannerStyled = Banner.extend`
  padding-top: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${BORDER_SECONDARY};
  padding: 20px 0 50px;
  height: 200px;
  margin-bottom: 20px;

  @media only screen and (max-width: 576px) {
    border-bottom: none;
    padding: 0;
  }
`;

const BannerComponent = () => {
  const { t } = useTranslation();

  return (
    <BannerStyled>
      <img src={letterSmile} alt="leave-message" />
      <div>
        <p>{t('common.supportDesc.feelFreeToAsk')}</p>
        <p>{t('common.supportDesc.alsoWeHighly')}</p>
      </div>
    </BannerStyled>
  );
};

export default BannerComponent;
