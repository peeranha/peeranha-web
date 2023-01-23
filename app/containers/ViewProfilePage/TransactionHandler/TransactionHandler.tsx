import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';

import Span from 'components/Span';

import commonMessages from 'common-messages';
import {
  META_TRANSACTIONS_ALLOWED,
  DISPATCHER_TRANSACTIONS_ALLOWED,
  TRANSACTIONS_ALLOWED,
  TORUS_WALLET,
  CONNECTED_WALLET,
  ONE_MONTH,
  TYPE_OF_TRANSACTIONS,
} from 'utils/constants';
import { setCookie, getCookie } from 'utils/cookie';
import TransactionOption from './TransactionOption';

const TransactionHandler: React.FC = (): JSX.Element => {
  const isTransactionsAllowed = getCookie(TYPE_OF_TRANSACTIONS);

  const [transaction, setTransaction] = useState<string>(isTransactionsAllowed);

  const isTorusWallet = getCookie(CONNECTED_WALLET) === TORUS_WALLET;

  useEffect(() => {
    if (!isTransactionsAllowed && isTorusWallet) {
      setTransaction(DISPATCHER_TRANSACTIONS_ALLOWED);
    }
  }, []);

  const handleDispatcherTransactionsAllowed = () => {
    setCookie({
      name: TYPE_OF_TRANSACTIONS,
      value: DISPATCHER_TRANSACTIONS_ALLOWED,
      options: {
        'max-age': ONE_MONTH,
        defaultPath: true,
        allowSubdomains: true,
      },
    });
    setTransaction(DISPATCHER_TRANSACTIONS_ALLOWED);
  };

  const handleMetaTransactionsAllowed = () => {
    setCookie({
      name: TYPE_OF_TRANSACTIONS,
      value: META_TRANSACTIONS_ALLOWED,
      options: {
        neverExpires: true,
        defaultPath: true,
        allowSubdomains: true,
      },
    });
    setTransaction(META_TRANSACTIONS_ALLOWED);
  };

  const handleMetaTransactionsDisallowed = () => {
    setCookie({
      name: TYPE_OF_TRANSACTIONS,
      value: TRANSACTIONS_ALLOWED,
      options: {
        neverExpires: true,
        defaultPath: true,
        allowSubdomains: true,
      },
    });
    setTransaction(TRANSACTIONS_ALLOWED);
  };

  return (
    <>
      <div>
        <div className="mb-4">
          <div className="mb-2">
            <Span fontSize="18" bold>
              <FormattedMessage id={commonMessages.transactions.id} />
            </Span>
          </div>
        </div>
      </div>
      <div className="fz14 pl-0">
        <TransactionOption
          transaction={transaction}
          transactionOption={DISPATCHER_TRANSACTIONS_ALLOWED}
          transactionHandler={handleDispatcherTransactionsAllowed}
          transactionTitle={commonMessages.transactionsText_1.id}
          transactionSubtitle={commonMessages.transactionsChange_1.id}
          Recommended
        />
        <TransactionOption
          transaction={transaction}
          transactionOption={META_TRANSACTIONS_ALLOWED}
          transactionHandler={handleMetaTransactionsAllowed}
          transactionTitle={commonMessages.transactionsText_2.id}
          transactionSubtitle={commonMessages.transactionsChange_2.id}
        />
        <TransactionOption
          transaction={transaction}
          transactionOption={TRANSACTIONS_ALLOWED}
          transactionHandler={handleMetaTransactionsDisallowed}
          transactionTitle={commonMessages.transactionsText_3.id}
          transactionSubtitle={commonMessages.transactionsChange_3.id}
        />
      </div>
    </>
  );
};

export default TransactionHandler;
