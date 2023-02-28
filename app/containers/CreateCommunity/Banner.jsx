import React from 'react';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import bannerImage from 'images/communityIsSuggested.svg?inline';
import i18next from 'app/i18n';

export const Banner = () => {
  const { t } = useTranslation();
  const baseUrl = i18next.language === 'en' ? '' : `/${i18next.language}`;

  return (
    <Wrapper>
      <img src={bannerImage} alt="create-community" />
      <div>
        <p>{t('createCommunity.thatisgreat')}</p>

        <p>{t('createCommunity.communityWillAppear')}</p>

        <Button onClick={() => createdHistory.push(baseUrl + routes.communities())}>
          {t('createCommunity.goToList')}
        </Button>
      </div>
    </Wrapper>
  );
};

export default React.memo(Banner);
