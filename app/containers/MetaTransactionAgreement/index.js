import React, { useState } from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { useTranslation } from 'react-i18next';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  DAEMON,
  CURRENCY,
  META_TRANSACTIONS_ALLOWED,
  DISPATCHER_TRANSACTIONS_ALLOWED,
  TORUS_WALLET,
  CONNECTED_WALLET,
  ONE_MONTH,
  TYPE_OF_TRANSACTIONS,
} from 'utils/constants';
import { setCookie, getCookie } from 'utils/cookie';

import PopupForNotBalance from './PopupForNotBalance';
import PopupForTorusWallet from './PopupForTorusWallet';

import TransactionHandler from 'containers/ViewProfilePage/TransactionHandler';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import reducer from 'containers/EthereumProvider/reducer';
import saga from 'containers/EthereumProvider/saga';

import { hideModal } from 'containers/EthereumProvider/actions';

import {
  makeSelectEthereum,
  makeSelectShowModal,
} from '../EthereumProvider/selectors';
import Popup from 'common-components/Popup';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';

/* eslint-disable react/prefer-stateless-function */
export const MetaTransactionAgreement = ({
  showModal,
  hideModalDispatch,
  ethereum,
  account,
}) => {
  const dataFromCookies = getCookie(TYPE_OF_TRANSACTIONS);
  const [transaction, setTransaction] = useState(dataFromCookies);
  const { t } = useTranslation();

  const isTorusWallet = getCookie(CONNECTED_WALLET) === TORUS_WALLET;
  const isBalance =
    Number(ethereum.wallet?.accounts?.[0]?.balance?.[CURRENCY]) > 0;

  const hideModal = () => {
    ethereum.stopWaiting();
    hideModalDispatch();
  };

  const cleanTransactionCookie = () => {
    setTransaction(null), hideModal();
  };

  const agreeWithMeta = () => {
    setCookie({
      name: TYPE_OF_TRANSACTIONS,
      value: META_TRANSACTIONS_ALLOWED,
      options: {
        neverExpires: true,
        defaultPath: true,
        allowSubdomains: true,
      },
    });
    // hideModal();
  };

  const agreeWithDispatcherTransactions = () => {
    setCookie({
      name: TYPE_OF_TRANSACTIONS,
      value: DISPATCHER_TRANSACTIONS_ALLOWED,
      options: {
        'max-age': ONE_MONTH,
        defaultPath: true,
        allowSubdomains: true,
      },
    });
    // hideModal();
  };

  return (
    <>
      {showModal && (
        <>
          {!isBalance && dataFromCookies && (
            <PopupForNotBalance
              hideModal={hideModal}
              agreeWithMeta={agreeWithMeta}
            />
          )}
          {isTorusWallet && !dataFromCookies && (
            <Popup size="tiny" onClose={hideModal}>
              <PopupForTorusWallet
                agreeWithDispatcherTransactions={
                  agreeWithDispatcherTransactions
                }
                account={account}
              />
            </Popup>
          )}
          {!isTorusWallet && !dataFromCookies && (
            <Popup size="small" onClose={hideModal} withoutClose={false}>
              <TransactionHandler
                transaction={transaction}
                setTransaction={setTransaction}
              />
              {t('common.transactionsText_4')}
              <div className="df aic jcc mt-4">
                <OutlinedButton
                  className="mr-3"
                  onClick={cleanTransactionCookie}
                >
                  {t('common.metaTransaction.cansel')}
                </OutlinedButton>
                <ContainedButton
                  disabled={!transaction}
                  block={!transaction}
                  onClick={(e) => {
                    e.preventDefault();
                    hideModal();
                  }}
                >
                  {t('common.continue')}
                </ContainedButton>
              </div>
            </Popup>
          )}
        </>
      )}
    </>
  );
};

MetaTransactionAgreement.propTypes = {
  account: PropTypes.string,
  showModal: PropTypes.bool,
  hideModalDispatch: PropTypes.func,
  ethereum: PropTypes.object,
  locale: PropTypes.string,
};

const withConnect = connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    showModal: makeSelectShowModal(),
    ethereum: makeSelectEthereum(),
    account: makeSelectAccount(),
  }),
  (dispatch) => ({
    hideModalDispatch: bindActionCreators(hideModal, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'ethereumProvider', reducer });
const withSaga = injectSaga({ key: 'ethereumProvider', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MetaTransactionAgreement);
