/**
 *
 * ChangePasswordByPrevious
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

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import ChangePasswordForm from './ChangePasswordForm';

import {
  showChangePasswordModal,
  hideChangePasswordModal,
  changePassword,
  sendAnotherCode,
} from './actions';

import { CHANGE_PASSWORD_FORM } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class ChangePasswordByPrevious extends React.PureComponent {
  render() {
    const {
      hideChangePasswordModalDispatch,
      showChangePasswordModalDispatch,
      children,
      showModal,
      locale,
      content,
      changePasswordDispatch,
      changePasswordProcessing,
    } = this.props;

    return (
      <>
        <Modal show={showModal} closeModal={hideChangePasswordModalDispatch}>
          {content === CHANGE_PASSWORD_FORM && (
            <ChangePasswordForm
              locale={locale}
              changePassword={changePasswordDispatch}
              changePasswordProcessing={changePasswordProcessing}
            />
          )}
        </Modal>

        <Button
          onClick={showChangePasswordModalDispatch}
          style={{ paddingBottom: 2 }}
        >
          {children}
        </Button>
      </>
    );
  }
}

ChangePasswordByPrevious.propTypes = {
  hideChangePasswordModalDispatch: PropTypes.func,
  showChangePasswordModalDispatch: PropTypes.func,
  children: PropTypes.any,
  showModal: PropTypes.bool,
  locale: PropTypes.string,
  content: PropTypes.string,
  changePasswordDispatch: PropTypes.func,
  changePasswordProcessing: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  loginData: makeSelectLoginData(),
  content: selectors.selectContent(),
  showModal: selectors.selectShowModal(),
  changePasswordProcessing: selectors.selectChangePasswordProcessing(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    sendAnotherCodeDispatch: bindActionCreators(sendAnotherCode, dispatch),
    changePasswordDispatch: bindActionCreators(changePassword, dispatch),
    showChangePasswordModalDispatch: bindActionCreators(
      showChangePasswordModal,
      dispatch,
    ),
    hideChangePasswordModalDispatch: bindActionCreators(
      hideChangePasswordModal,
      dispatch,
    ),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'showChangePassword', reducer });
const withSaga = injectSaga({ key: 'showChangePassword', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChangePasswordByPrevious);
