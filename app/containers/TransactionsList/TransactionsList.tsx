import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DAEMON } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { FormattedMessage } from 'react-intl';

import reducer from 'containers/Administration/reducer';
import saga from 'containers/Administration/saga';

import { css } from '@emotion/react';
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
import commonMessages from 'common-messages';
import {
  SingleTransaction,
  Transaction,
} from 'containers/TransactionsList/SingleTransaction';
import messages from 'containers/TransactionsList/messages';
import { styles } from 'containers/TransactionsList/TransactionList.styled';

type TransactionsListProps = {
  transactionList: Array<Transaction>;
  transactionInPending: boolean;
};

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactionList,
  transactionInPending,
}): JSX.Element => {
  const [opened, setOpened] = useState(false);
  const timer = useRef();
  const [right, setRight] = useState(-245);
  const [width, setWidth] = useState(289);

  useEffect(() => {
    if (!transactionList.length && !transactionInPending) {
      setRight(-289);
      setOpened(false);
    } else {
      if (!opened) {
        setRight(-245);
      }
    }
  }, [transactionList, opened]);

  const successfulTransactions = transactionList.filter(
    (transaction) => transaction.result?.status === 1,
  );
  const transactionsInProgress = transactionList.filter(
    (transaction) => transaction.result?.status !== 1,
  );

  useEffect(() => {
    if (transactionList.length && transactionInPending && !opened) {
      setWidth(449);
      timer.current = setTimeout(() => setWidth(289), '3000');

      return () => {
        clearTimeout(timer.current);
      };
    }
  }, [transactionInPending]);

  const onStatusButtonClick = () => {
    if (opened) {
      setRight(-245);
    } else {
      setRight(0);
    }
    setOpened(!opened);
  };

  const statusIcon = () => {};

  return (
    <div
      id="transactions-status-block"
      css={{ ...styles.transactionsStatusBlock, right }}
    >
      {opened && <div css={styles.blocker} />}

      <div
        id="status-button"
        className="df fdr aic pl16 pa"
        css={{ ...styles.statusButton, width }}
        onClick={onStatusButtonClick}
      >
        <TransactionStatus className="icon" />
        <div id="transactions-popup" className="df fdc ml12">
          <div
            css={css`
              font-size: 14px;
              color: #ffffff;
              font-weight: 400;
            `}
          >
            {transactionList.length && (
              <FormattedMessage
                id={
                  messages[transactionList[transactionList.length - 1].action]
                    .id
                }
              />
            )}
          </div>
          <div
            css={css`
              font-size: 12px;
              color: #ffffff;
            `}
          >
            <FormattedMessage id={commonMessages.inProgress.id} />
          </div>
        </div>
      </div>

      <div
        id="transaction-list"
        className="df fdc aifs pa"
        css={styles.transactionList}
      >
        <p
          css={css`
            font-weight: 700;
          `}
        >
          <FormattedMessage id={commonMessages.transactions.id} />
        </p>

        {transactionsInProgress.map((transaction) => {
          const result = transaction.result?.status;
          const status = result
            ? commonMessages.failed.id
            : commonMessages.inProgress.id;
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
            />
          );
        })}

        {Boolean(
          successfulTransactions.length && transactionsInProgress.length,
        ) && (
          <div
            css={css`
              width: 213px;
              height: 1px;
              background: rgba(53, 74, 137, 0.15);
              align-self: stretch;
              flex-grow: 0;
            `}
          />
        )}

        {successfulTransactions.map((transaction) => (
          <SingleTransaction
            transaction={transaction}
            status={commonMessages.successful.id}
            StatusIcon={() => <SuccessfulTransaction />}
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
      transactionList: selectTransactionList(),
      transactionInPending: selectTransactionInPending(),
    }),
  ),
)(TransactionsList);