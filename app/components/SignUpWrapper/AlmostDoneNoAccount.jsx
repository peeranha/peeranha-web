import React from 'react';
import { useTranslation } from 'react-i18next';

import AlmostDone from './AlmostDone';

const AlmostDoneNoAccountWrapper = () => {
  const { t } = useTranslation();

  return <AlmostDone message={t('sign-up.weWillNotify')} />;
};

export default AlmostDoneNoAccountWrapper;
