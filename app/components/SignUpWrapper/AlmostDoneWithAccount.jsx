import React from 'react';
import { useTranslation } from 'react-i18next';

import AlmostDone from './AlmostDone';

const AlmostDoneWrapper = () => {
  const { t } = useTranslation();

  return (
    <AlmostDone message={t('signUp.registrationWithEosAccountAlmostDone')} />
  );
};

export default AlmostDoneWrapper;
