import React from 'react';
import { useTranslation } from 'react-i18next';
import * as routes from 'routes-config';

import A from 'components/A';
import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';

type PopupForTorusWallet = {
  agreeWithDispatcherTransactions: () => void;
  account: string;
};

const PopupForTorusWallet: React.FC<PopupForTorusWallet> = ({
  agreeWithDispatcherTransactions,
  account,
}): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <div className="tc pb-3" css={{ lineHeight: '18px' }}>
        {t('common.metaTransaction.agreeWithMetaTransactionsText')}
      </div>
      <div className="df aic jcc">
        <ContainedButton
          className="w-100 mb-3"
          onClick={agreeWithDispatcherTransactions}
          css={{ maxWidth: '300px' }}
        >
          {t('common.metaTransaction.allow')}
        </ContainedButton>
      </div>
      <div
        className="tc mb-3"
        css={{
          lineHeight: '18px',
          fontSize: '16px',
          color: 'var(--color-gray-dark)',
        }}
      >
        {t('common.metaTransaction.agreeWithMetaTransactionsSecondaryText')}
        <A
          to={routes.userSettings(account)}
          className="db mt-1"
          target="_blank"
          css={{ margin: '0 auto', color: 'var(--color-blue)' }}
        >
          {t('common.metaTransaction.options')}
        </A>
      </div>
    </>
  );
};

export default PopupForTorusWallet;
