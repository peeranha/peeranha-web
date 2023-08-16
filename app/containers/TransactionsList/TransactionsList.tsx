import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { useTranslation } from 'react-i18next';

import reducer from 'containers/Administration/reducer';
import saga from 'containers/Administration/saga';

import {
  SuccessfulTransaction,
  FailedTransaction,
  TransactionLoader,
  TransactionStatus,
} from 'icons/index';
import {
  selectTransactionInPending,
  selectTransactionList,
} from 'containers/EthereumProvider/selectors';
import { SingleTransaction, Transaction } from 'containers/TransactionsList/SingleTransaction';
import { styles } from 'containers/TransactionsList/TransactionList.styled';
import { isSuiBlockchain } from 'utils/sui/sui';
import { selectSuiTransactionList } from 'containers/SuiProvider/selectors';

type TransactionsListProps = {
  transactionList: Array<Transaction>;
  transactionInPending: boolean;
};

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactionList,
  transactionInPending,
}): JSX.Element => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState<boolean>(false);
  const timer = useRef();
  const [right, setRight] = useState<number>(-289);
  const [width, setWidth] = useState<number>(289);

  useEffect(() => {
    if (!transactionList.length) {
      setRight(-289);
      setOpened(false);
    } else if (!opened) {
      setRight(-245);
    }
  }, [transactionList, opened]);

  const successfulTransactions = transactionList.filter(
    (transaction) => transaction.result?.status === 1,
  );
  const transactionsInProgress = transactionList.filter(
    (transaction) => transaction.result?.status !== 1,
  );

  useEffect(() => {
    if (Boolean(transactionList.length) && transactionInPending && !opened) {
      setWidth(449);
      timer.current = setTimeout(() => setWidth(289), 3000);
    }
  }, [opened, transactionInPending, transactionList.length]);

  const onStatusButtonClick = () => {
    if (opened) {
      setRight(-245);
    } else {
      setRight(0);
      setWidth(289);
    }
    setOpened(!opened);
  };

  return (
    <div id="transactions-status-block" css={{ ...styles.transactionsStatusBlock, right }}>
      {opened && <div css={styles.blocker} />}

      <div id="status-button" css={{ ...styles.statusButton, width }} onClick={onStatusButtonClick}>
        <TransactionStatus className="icon" />
        <div id="transactions-popup" css={styles.transactionsPopup}>
          <div>
            {transactionList.length &&
              t(`common.transactionsList.${transactionList[transactionList.length - 1].action}`)}
          </div>
          <div>{t('common.inProgress')}</div>
        </div>
      </div>

      <div id="transaction-list" css={styles.transactionList}>
        <p>{t('common.transactions')}</p>

        {transactionsInProgress.map((transaction) => {
          const result = transaction.result?.status;
          const status = result ? 'common.transactionsList.failed' : 'common.inProgress';

          return (
            <SingleTransaction
              transaction={transaction}
              status={status}
              StatusIcon={() =>
                result ? (
                  <FailedTransaction />
                ) : (
                  <TransactionLoader css={styles.transactionLoader} />
                )
              }
              key={transaction.transactionHash}
            />
          );
        })}

        {Boolean(successfulTransactions.length && transactionsInProgress.length) && (
          <div css={styles.successfulTransactions} />
        )}

        {successfulTransactions.map((transaction) => (
          <SingleTransaction
            transaction={transaction}
            status="common.transactionsList.successful"
            StatusIcon={() => <SuccessfulTransaction />}
            key={transaction.transactionHash}
          />
        ))}
      </div>
    </div>
  );
};

export default compose(
  injectReducer({ key: 'moderationReducer', reducer }),
  injectSaga({ key: 'moderationReducer', saga, mode: DAEMON }),
  connect(
    createStructuredSelector<any>({
      locale: makeSelectLocale(),
      transactionList: isSuiBlockchain ? selectSuiTransactionList() : selectTransactionList(),
      transactionInPending: selectTransactionInPending(),
    }),
  ),
)(TransactionsList);
