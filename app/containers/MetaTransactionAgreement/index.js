import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

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
import * as routes from 'routes-config';

import ModalDialog from 'components/ModalDialog';

import TransactionHandler from 'containers/ViewProfilePage/TransactionHandler';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

import reducer from 'containers/EthereumProvider/reducer';
import saga from 'containers/EthereumProvider/saga';

import {
  makeSelectEthereum,
  makeSelectShowModal,
} from '../EthereumProvider/selectors';
import { FormattedMessage } from 'react-intl';
import H4 from 'components/H4';
import Popup from 'common-components/Popup';
import A from 'components/A';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import messages from 'containers/MetaTransactionAgreement/messages';
import { hideModal } from 'containers/EthereumProvider/actions';

/* eslint-disable react/prefer-stateless-function */
export const MetaTransactionAgreement = ({
  showModal,
  hideModalDispatch,
  ethereum,
  account,
}) => {
  const dataFromCookies = getCookie(TYPE_OF_TRANSACTIONS);
  const isTorusWallet = getCookie(CONNECTED_WALLET) === TORUS_WALLET;
  const isBalance =
    Number(ethereum.wallet?.accounts?.[0]?.balance?.[CURRENCY]) > 0;

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
    hideModal();
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
    hideModal();
  };

  const hideModal = () => {
    ethereum.stopWaiting();
    hideModalDispatch();
  };

  return (
    <>
      {showModal && (
        <Popup size="small" onClose={hideModal}>
          {!isBalance && dataFromCookies && (
            <>
              <H4 className="text-center pb-3">
                <FormattedMessage id={messages.agreeWithMetaTransactions.id} />
              </H4>

              <div className="pb-4" style={{ textAlign: 'center' }}>
                <FormattedMessage id={messages.wouldYouLike.id} />
              </div>

              <div className="d-flex align-items-center pb-3">
                <OutlinedButton className="mr-3" onClick={hideModal}>
                  <FormattedMessage id={messages.cansel.id} />
                </OutlinedButton>

                <ContainedButton onClick={agreeWithMeta}>
                  <FormattedMessage id={messages.confirm.id} />
                </ContainedButton>
              </div>
            </>
          )}
          {isTorusWallet && !dataFromCookies && (
            <>
              <div className="text-center pb-3" css={{ lineHeight: '18px' }}>
                <FormattedMessage
                  id={messages.agreeWithMetaTransactionsText.id}
                />
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
          )}
          {!isTorusWallet && !dataFromCookies && <TransactionHandler />}
        </Popup>
      )}
    </>
  );
};

MetaTransactionAgreement.propTypes = {
  content: PropTypes.string,
  showModal: PropTypes.bool,
  hideLoginModalDispatch: PropTypes.func,
  locale: PropTypes.string,
  email: PropTypes.string,
  loginWithEmailProcessing: PropTypes.bool,
  finishRegistrationProcessing: PropTypes.bool,
  loginWithWalletProcessing: PropTypes.bool,
  showEmailPasswordFormDispatch: PropTypes.func,
  loginWithEmailDispatch: PropTypes.func,
  loginWithWalletDispatch: PropTypes.func,
  finishRegistrationDispatch: PropTypes.func,
  showForgotPasswordModalDispatch: PropTypes.func,
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
