import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import TransactionHandler from './TransactionHandler';
import Notifications from './Notifications';
import { TYPE_OF_TRANSACTIONS } from 'utils/constants';
import { getCookie } from 'utils/cookie';
import { styles } from './Settings.styled';

type SettingsProps = {
  email: string;
  isSubscribedEmail: boolean;
  showChangeEmailModal: () => void;
  unsubscribeEmail: () => void;
};

const Settings: React.FC<SettingsProps> = ({
  email,
  isSubscribedEmail,
  showChangeEmailModal,
  unsubscribeEmail,
}): JSX.Element => {
  const { t } = useTranslation();
  const dataFromCookies = getCookie(TYPE_OF_TRANSACTIONS);
  const [transaction, setTransaction] = useState(dataFromCookies);

  return (
    <>
      <div css={styles.base}>
        <h3 css={styles.h3}>{t('common.settings')}</h3>
      </div>
      <div css={styles.base}>
        <Notifications
          email={email}
          isSubscribedEmail={isSubscribedEmail}
          showChangeEmailModal={showChangeEmailModal}
          unsubscribeEmail={unsubscribeEmail}
        />
        <TransactionHandler
          transaction={transaction}
          setTransaction={setTransaction}
          settings
        />
      </div>
    </>
  );
};

export default Settings;
