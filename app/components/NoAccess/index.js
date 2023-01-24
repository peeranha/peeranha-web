import React from 'react';
import { useTranslation } from 'react-i18next';

import Seo from 'components/Seo';

function NoAccess() {
  const { t } = useTranslation();

  return (
    <div className="container">
      <Seo
        title="No access"
        description="No access"
        language="en"
        index={false}
      />

      <div className="text-center pt-3">
        {t('common.youDontHaveFeedToRead')}
      </div>
    </div>
  );
}

export default NoAccess;
