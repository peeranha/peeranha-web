import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import Span from 'components/Span';

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

type TransactionHandlerProps = {
  transaction: string;
  setTransaction: (transaction: string) => void;
  settings?: boolean;
};

const TransactionHandler: React.FC<TransactionHandlerProps> = ({
  transaction,
  setTransaction,
  settings,
}): JSX.Element => {
  const { t } = useTranslation();
  const isTransactionsAllowed = getCookie(TYPE_OF_TRANSACTIONS);

  const isTorusWallet = getCookie(CONNECTED_WALLET) === TORUS_WALLET;

  useEffect(() => {
    if (!isTransactionsAllowed && isTorusWallet) {
      setTransaction(DISPATCHER_TRANSACTIONS_ALLOWED);
    }
  }, []);

  const handleDispatcherTransactionsAllowed = () => {
    if (settings) {
      setCookie({
        name: TYPE_OF_TRANSACTIONS,
        value: DISPATCHER_TRANSACTIONS_ALLOWED,
        options: {
          'max-age': ONE_MONTH,
          defaultPath: true,
          allowSubdomains: true,
        },
      });
    }
    setTransaction(DISPATCHER_TRANSACTIONS_ALLOWED);
  };

  const handleMetaTransactionsAllowed = () => {
    if (settings) {
      setCookie({
        name: TYPE_OF_TRANSACTIONS,
        value: META_TRANSACTIONS_ALLOWED,
        options: {
          neverExpires: true,
          defaultPath: true,
          allowSubdomains: true,
        },
      });
    }
    setTransaction(META_TRANSACTIONS_ALLOWED);
  };

  const handleMetaTransactionsDisallowed = () => {
    if (settings) {
      setCookie({
        name: TYPE_OF_TRANSACTIONS,
        value: TRANSACTIONS_ALLOWED,
        options: {
          neverExpires: true,
          defaultPath: true,
          allowSubdomains: true,
        },
      });
    }
    setTransaction(TRANSACTIONS_ALLOWED);
  };

  const transactionTypes = {
    dispatcher: {
      transactionOption: DISPATCHER_TRANSACTIONS_ALLOWED,
      transactionHandler: handleDispatcherTransactionsAllowed,
      transactionTitle: t('common.transactionsText_1'),
      transactionSubtitle: t('common.transactionsChange_1'),
    },
    metaTransaction: {
      transactionOption: META_TRANSACTIONS_ALLOWED,
      transactionHandler: handleMetaTransactionsAllowed,
      transactionTitle: t('common.transactionsText_2'),
      transactionSubtitle: t('common.transactionsChange_2'),
    },
    defaultTransaction: {
      transactionOption: TRANSACTIONS_ALLOWED,
      transactionHandler: handleMetaTransactionsDisallowed,
      transactionTitle: t('common.transactionsText_3'),
      transactionSubtitle: t('common.transactionsChange_3'),
    },
  };

  return (
    <>
      <div>
        <div className="mb-4">
          <div className="mb-2">
            <Span fontSize="18" bold>
              {t('common.transactionsText')}
            </Span>
          </div>
        </div>
      </div>
      <div className="fz16 pl-0">
        {Object.values(transactionTypes).map((item, index) => (
          <TransactionOption
            key={index}
            transaction={transaction}
            transactionOption={item.transactionOption}
            transactionHandler={item.transactionHandler}
            transactionTitle={item.transactionTitle}
            transactionSubtitle={item.transactionSubtitle}
            Recommended={index === 0}
          />
        ))}
      </div>
    </>
  );
};

export default TransactionHandler;
