import React, { useEffect, useState } from 'react';
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
import { SingleTransaction } from 'containers/TransactionsList/SingleTransaction';
import messages from 'containers/TransactionsList/messages';
import { styles } from 'containers/TransactionsList/TransactionList.styled';

type TransactionsListProps = {
  transactionList: Array<SingleTransaction>;
  transactionInPending: boolean;
};

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactionList,
  transactionInPending,
}): JSX.Element => {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const transactionsStatusBlock = document.getElementById(
      'transactions-status-block',
    );
    if (!transactionList.length && !transactionInPending) {
      transactionsStatusBlock.style.right = '-289px';
      setOpened(false);
    } else {
      if (!opened) {
        transactionsStatusBlock.style.right = '-245px';
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
      document.getElementById('status-button').style.width = '449px';
      setTimeout(
        () => (document.getElementById('status-button').style.width = '289px'),
        '3000',
      );
    }
  }, [transactionInPending]);

  return (
    <div id="transactions-status-block" css={styles.transactionsStatusBlock}>
      {opened && <div css={styles.blocker} />}

      <div
        id="status-button"
        className="df fdr aic pl16 pa"
        css={styles.statusButton}
        onClick={() => {
          const transactionsStatusBlock = document.getElementById(
            'transactions-status-block',
          );
          if (opened) {
            transactionsStatusBlock.style.right = '-245px';
          } else {
            transactionsStatusBlock.style.right = '0';
          }
          setOpened(!opened);
        }}
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
          let status;
          if (result) {
            status =
              result === 1 ? (
                <FormattedMessage id={commonMessages.successful.id} />
              ) : (
                <FormattedMessage id={commonMessages.failed.id} />
              );
          } else {
            status = <FormattedMessage id={commonMessages.inProgress.id} />;
          }

          return (
            <SingleTransaction
              transaction={transaction}
              statusMessage={status}
              StatusIcon={() =>
                result ? (
                  result === 1 ? (
                    <SuccessfulTransaction />
                  ) : (
                    <FailedTransaction />
                  )
                ) : (
                  <TransactionLoader
                    css={css`
                      animation: rotation 2s infinite linear;
                      @keyframes rotation {
                        0% {
                          transform: rotate(0deg);
                        }
                        100% {
                          transform: rotate(360deg);
                        }
                      }
                    `}
                  />
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
            statusMessage={
              <FormattedMessage id={commonMessages.successful.id} />
            }
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
