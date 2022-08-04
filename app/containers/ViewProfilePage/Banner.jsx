import React from 'react';
import { useTranslation } from 'react-i18next';

import Wrapper from 'components/Banner';
import H4 from 'components/H4';

import noActivityImg from 'images/userHasntActivity.png';

const Banner = () => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 isHeader>{t('profile.activity')}</H4>
      <Wrapper>
        <img src={noActivityImg} alt="view-profile" />
        <div>
          <p>{t('profile.userHasntActivityYet')}</p>

          <p>{t('profile.heHasNoAnswersAndPosts')}</p>
        </div>
      </Wrapper>
    </div>
  );
};

export default Banner;
