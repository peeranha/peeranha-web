import React from 'react';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';

import { ADefault } from 'components/A';

const IAcceptTerms = () => {
  const { t } = useTranslation();

  return (
    <>
      {t('common.iAcceptPrivacyPolicy')}
      <ADefault href={routes.privacyPolicy()} target="_blank">
        {t('common.privacyPolicy')}
      </ADefault>
      {', '}
      <ADefault href={routes.termsAndConditions()} target="_blank">
        {t('common.termsOfService')}
      </ADefault>
    </>
  );
};

export default IAcceptTerms;
