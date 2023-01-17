import React from 'react';

import * as routes from 'routes-config';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/MetaTransactionAgreement/messages';

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
  return (
    <>
      <div className="text-center pb-3" css={{ lineHeight: '18px' }}>
        <FormattedMessage id={messages.agreeWithMetaTransactionsText.id} />
      </div>
      <ContainedButton
        className="w-100 mb-3"
        onClick={agreeWithDispatcherTransactions}
      >
        <FormattedMessage id={messages.allow.id} />
      </ContainedButton>
      <div
        className="text-center"
        css={{
          lineHeight: '15px',
          fontSize: '14px',
          color: 'var(--color-gray-dark)',
        }}
      >
        <FormattedMessage
          className="mb-3"
          id={messages.agreeWithMetaTransactionsSecondaryText.id}
        />
        <A
          to={routes.userSettings(account)}
          className="db mt-1"
          target="_blank"
          css={{ margin: '0 auto', color: 'var(--color-blue)' }}
        >
          <FormattedMessage id={messages.options.id} />
        </A>
      </div>
    </>
  );
};

export default PopupForTorusWallet;
