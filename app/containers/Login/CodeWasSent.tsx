import React from 'react';
import { useTranslation } from 'react-i18next';

import letterSmile from 'images/letter-smile.svg?inline';
import Button from 'components/Button/Contained/InfoLarge';
import { styles } from 'containers/Login/Login.styled';

const CodeWasSent = ({ startVerifying }: { startVerifying: () => void }) => {
  const { t } = useTranslation();

  return (
    <div css={styles.wasSentContainer}>
      <img css={styles.letterImage} src={letterSmile} alt="leave-message" />
      <p css={styles.wasSentText}>{t('login.codeWasSent')}</p>
      <Button onClick={startVerifying} css={{ width: '182px' }}>
        {t('signUp.verify')}
      </Button>
    </div>
  );
};

export default CodeWasSent;
