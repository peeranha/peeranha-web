import React from 'react';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import Banner from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import bannerImage from 'images/faqBanner.svg?inline';
import i18next from 'app/i18n';

export const AskQuestionBanner = () => {
  const { t } = useTranslation();
  const baseUrl = i18next.language === 'en' ? '' : `/${i18next.language}`;

  return (
    <Banner>
      <img src={bannerImage} alt="askQuestionBanner" />
      <div>
        <p>{t('common.didntFindAnswer')}</p>

        <p>{t('common.freeFeelToAsk')}</p>

        <Button onClick={() => createdHistory.push(baseUrl + routes.support())}>
          {t('common.help')}
        </Button>
      </div>
    </Banner>
  );
};

export default AskQuestionBanner;
