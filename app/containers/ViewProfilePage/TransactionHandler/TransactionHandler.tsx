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
import { deleteCookie, setCookie, getCookie } from 'utils/cookie';
import { styled } from './TransactionHandler.styled';

const TransactionHandler: React.FC = (): JSX.Element => {
  const isTransactionsAllowed = getCookie(TYPE_OF_TRANSACTIONS);

  const [transaction, setTransaction] = useState<string>(isTransactionsAllowed);

  const isTorusWallet = getCookie(CONNECTED_WALLET) == TORUS_WALLET;

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
        <div className="mb-3">
          <label className="df aic">
            <input
              className="mr-2 dn"
              type="radio"
              checked={transaction == DISPATCHER_TRANSACTIONS_ALLOWED}
              onChange={handleDispatcherTransactionsAllowed}
              css={styled.input}
            />
            <div className="df aic" css={styled.inputRadio}>
              <div>
                <div className="mb-1 bold pr" css={styled.recommended}>
                  <FormattedMessage id={commonMessages.transactionsText_1.id} />
                </div>
                <div css={styled.secondaryColor}>
                  <FormattedMessage
                    id={commonMessages.transactionsChange_1.id}
                  />
                </div>
              </div>
            </div>
          </label>
        </div>
        <div className="mb-3">
          <label>
            <input
              className="mr-2 dn"
              type="radio"
              checked={transaction == META_TRANSACTIONS_ALLOWED}
              onChange={handleMetaTransactionsAllowed}
              css={styled.input}
            />
            <div className="df aic" css={styled.inputRadio}>
              <div>
                <div className="mb-1 bold">
                  <FormattedMessage id={commonMessages.transactionsText_2.id} />
                </div>
                <div css={styled.secondaryColor}>
                  <FormattedMessage
                    id={commonMessages.transactionsChange_2.id}
                  />
                </div>
              </div>
            </div>
          </label>
        </div>
        <div className="mb-2">
          <label className="df aic">
            <input
              className="mr-2 dn"
              type="radio"
              checked={transaction == TRANSACTIONS_ALLOWED}
              onChange={handleMetaTransactionsDisallowed}
              css={styled.input}
            />
            <div className="df aic" css={styled.inputRadio}>
              <div>
                <div className="mb-1 bold">
                  <FormattedMessage id={commonMessages.transactionsText_3.id} />
                </div>
                <div css={styled.secondaryColor}>
                  <FormattedMessage
                    id={commonMessages.transactionsChange_3.id}
                  />
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default TransactionHandler;
