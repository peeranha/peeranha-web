/**
 *
 * ShowActiveKey
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectLoginData } from 'containers/AccountProvider/selectors';

import Modal from 'components/ModalDialog';
import Button from 'components/Button/Contained/Transparent';
import FbVerificationCodeForm from 'components/FbVerificationCodeForm/index';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import ShowActiveKeyForm from './ShowActiveKeyForm';

import {
  showActiveKey,
  showActiveKeyModal,
  hideActiveKeyModal,
  removeActiveKey,
  sendFbVerificationEmail,
  verifyFbAction,
} from './actions';
import { sendAnotherCode } from '../ShowOwnerKey/actions';

/* eslint-disable react/prefer-stateless-function */
export class ShowActiveKey extends React.PureComponent {
  render() /* istanbul ignore next */ {
    const {
      showActiveKeyDispatch,
      hideActiveKeyModalDispatch,
      children,
      showActiveKeyModalDispatch,
      showModal,
      showActiveKeyProcessing,
      locale,
      activeKey,
      removeActiveKeyDispatch,
      loginData,
      sendFbVerificationEmailDispatch,
      sendAnotherCodeDispatch,
      verifyFbActionDispatch,
    } = this.props;

    const { loginWithFacebook } = loginData;

    const showActiveKeyOnClick = () => {
      if (loginWithFacebook) {
        sendFbVerificationEmailDispatch();
      } else {
        showActiveKeyModalDispatch();
      }
    };

    return (
      <React.Fragment>
        <Modal show={showModal} closeModal={hideActiveKeyModalDispatch}>
          {!loginWithFacebook && (
            <ShowActiveKeyForm
              locale={locale}
              showActiveKey={showActiveKeyDispatch}
              showActiveKeyProcessing={showActiveKeyProcessing}
            />
          )}
          {loginWithFacebook && (
            <FbVerificationCodeForm
              locale={locale}
              verifyEmail={verifyFbActionDispatch}
              verifyEmailLoading={showActiveKeyProcessing}
              sendAnotherCode={sendAnotherCodeDispatch}
            />
          )}
        </Modal>

        <Button
          onClick={!activeKey ? showActiveKeyOnClick : removeActiveKeyDispatch}
        >
          {children}
        </Button>
      </React.Fragment>
    );
  }
}

ShowActiveKey.propTypes = {
  showActiveKeyDispatch: PropTypes.func,
  hideActiveKeyModalDispatch: PropTypes.func,
  showActiveKeyModalDispatch: PropTypes.func,
  removeActiveKeyDispatch: PropTypes.func,
  sendFbVerificationEmailDispatch: PropTypes.func,
  verifyFbActionDispatch: PropTypes.func,
  children: PropTypes.any,
  showActiveKeyProcessing: PropTypes.bool,
  showModal: PropTypes.bool,
  locale: PropTypes.string,
  activeKey: PropTypes.string,
  loginData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  showModal: selectors.selectShowModal(),
  showActiveKeyProcessing: selectors.selectShowActiveKeyProcessing(),
  loginData: makeSelectLoginData(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    showActiveKeyDispatch: bindActionCreators(showActiveKey, dispatch),
    removeActiveKeyDispatch: bindActionCreators(removeActiveKey, dispatch),
    showActiveKeyModalDispatch: bindActionCreators(
      showActiveKeyModal,
      dispatch,
    ),
    hideActiveKeyModalDispatch: bindActionCreators(
      hideActiveKeyModal,
      dispatch,
    ),
    sendFbVerificationEmailDispatch: bindActionCreators(
      sendFbVerificationEmail,
      dispatch,
    ),
    sendAnotherCodeDispatch: bindActionCreators(sendAnotherCode, dispatch),
    verifyFbActionDispatch: bindActionCreators(verifyFbAction, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'showActiveKey', reducer });
const withSaga = injectSaga({ key: 'showActiveKey', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShowActiveKey);
