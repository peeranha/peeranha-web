import React from 'react';
import { useTranslation } from 'react-i18next';

const LimitedLabel = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div
      className="pa bold fz14 pl8 pr8"
      css={{
        top: 4,
        right: 4,
        background:
          'linear-gradient(82.23deg, rgba(255, 255, 255, 0) 97.33%, rgba(255, 255, 255, 0.813625) 136.6%, rgba(255, 255, 255, 0) 175.67%), linear-gradient(220.98deg, #FFE069 23.25%, #AA6507 132.4%)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '70px',
        lineHeight: '18px',
        color: 'var(--color-white)',

        '@media (min-width: 1024px)': {
          top: 8,
          right: 8,
        },
      }}
    >
      {t('common.limitedEdition')}
    </div>
  );
};

export default LimitedLabel;
