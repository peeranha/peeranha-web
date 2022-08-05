import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON, META_TRANSACTIONS_ALLOWED } from 'utils/constants';

import ModalDialog from 'components/ModalDialog';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import reducer from 'containers/EthereumProvider/reducer';
import saga from 'containers/EthereumProvider/saga';

import {
  makeSelectEthereum,
  makeSelectShowModal,
} from '../EthereumProvider/selectors';
import { FormattedMessage } from 'react-intl';
import H4 from 'components/H4';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import messages from 'containers/MetaTransactionAgreement/messages';
import { hideModal } from 'containers/EthereumProvider/actions';
import { setCookie } from 'utils/cookie';

/* eslint-disable react/prefer-stateless-function */
export const MetaTransactionAgreement = ({
  showModal,
  hideModalDispatch,
  ethereum,
}) => {
  const agreeWithMeta = () => {
    setCookie({
      name: META_TRANSACTIONS_ALLOWED,
      value: true,
      options: {
        neverExpires: true,
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
    <ModalDialog closeModal={hideModal} show={showModal}>
      <H4 className="text-center pb-3">
        <FormattedMessage {...messages.agreeWithMetaTransactions} />
      </H4>

      <div className="pb-4" style={{ textAlign: 'center' }}>
        <FormattedMessage {...messages.youNeedMetaBecause} />
      </div>

      <div className="pb-4" style={{ textAlign: 'center' }}>
        <FormattedMessage {...messages.dontWorry} />
      </div>

      <div className="pb-4" style={{ textAlign: 'center' }}>
        <FormattedMessage {...messages.wouldYouLike} />
      </div>

      <div className="d-flex align-items-center pb-3">
        <OutlinedButton className="mr-3" onClick={hideModal}>
          <FormattedMessage {...messages.cansel} />
        </OutlinedButton>

        <ContainedButton onClick={agreeWithMeta}>
          <FormattedMessage {...messages.confirm} />
        </ContainedButton>
      </div>
    </ModalDialog>
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
};

const withConnect = connect(
  createStructuredSelector({
    locale: makeSelectLocale(),
    showModal: makeSelectShowModal(),
    ethereum: makeSelectEthereum(),
  }),
  dispatch => ({
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
