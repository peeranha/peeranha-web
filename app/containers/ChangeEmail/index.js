/**
 *
 * ChangeEmail
 *
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { t } from 'i18next';

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

import SendEmailForm from './SendEmailForm';
import ChangeEmailForm from './ChangeEmailForm';
import ConfirmEmailForm from './ConfirmEmailForm';

import {
  sendOldEmail,
  confirmOldEmail,
  changeEmail,
  showChangeEmailModal,
  hideChangeEmailModal,
  sendAnotherCode,
} from './actions';

import {
  OLD_EMAIL_FORM,
  CONFIRM_EMAIL_FORM,
  CHANGE_EMAIL_FORM,
} from './constants';
import { singleCommunityColors } from 'utils/communityManagement';
import EditIcon from 'icons/Edit';
import { styles } from './ChangeEmail.styled';

const colors = singleCommunityColors();
/* eslint-disable react/prefer-stateless-function */
const ChangeEmail = ({
  changeEmailDispatch,
  hideChangeEmailModalDispatch,
  children,
  showChangeEmailModalDispatch,
  showModal,
  changeEmailProcessing,
  locale,
  content,
  sendOldEmailDispatch,
  confirmOldEmailDispatch,
  sendOldEmailProcessing,
  confirmOldEmailProcessing,
  sendAnotherCodeDispatch,
  loginData,
  setOpen,
  open,
  verificationCodeError,
  disabled,
  verificationCode,
  verificationCodeRequest,
}) => {
  const [emailAddress, setEmailAddress] = useState(null);

  const clickEmailHandler = (event) =>
    setEmailAddress(event.target.form[0].value);
  const clickButtonHandler = useCallback(() => setOpen(!open), [open]);

  return (
    <React.Fragment>
      <Modal show={showModal} closeModal={hideChangeEmailModalDispatch}>
        {content === OLD_EMAIL_FORM && (
          <SendEmailForm
            locale={locale}
            sendOldEmail={sendOldEmailDispatch}
            sendOldEmailProcessing={sendOldEmailProcessing}
            loginData={loginData}
            closeModal={hideChangeEmailModalDispatch}
            emailAddress={emailAddress}
          />
        )}

        {content === CONFIRM_EMAIL_FORM && (
          <ConfirmEmailForm
            locale={locale}
            confirmOldEmail={confirmOldEmailDispatch}
            confirmOldEmailProcessing={confirmOldEmailProcessing}
            sendAnotherCode={sendAnotherCodeDispatch}
            closeModal={hideChangeEmailModalDispatch}
            emailAddress={emailAddress}
            verificationCodeError={verificationCodeError}
            verificationCode={verificationCode}
            verificationCodeRequest={verificationCodeRequest}
          />
        )}

        {content === CHANGE_EMAIL_FORM && <ChangeEmailForm />}
      </Modal>
      {!open ? (
        <Button
          onClick={clickEmailHandler}
          type="submit"
          disabled={disabled}
          css={styles.confirmButton}
        >
          {t('common.telegram.confirm')}
        </Button>
      ) : (
        <Button onClick={clickButtonHandler}>
          <EditIcon
            css={{ marginRight: '5px' }}
            stroke={colors.btnColor}
            fill={colors.btnColor}
          />
          {t('common.edit')}
        </Button>
      )}
    </React.Fragment>
  );
};

ChangeEmail.propTypes = {
  changeEmailDispatch: PropTypes.func,
  hideChangeEmailModalDispatch: PropTypes.func,
  showChangeEmailModalDispatch: PropTypes.func,
  sendAnotherCodeDispatch: PropTypes.func,
  sendOldEmailDispatch: PropTypes.func,
  confirmOldEmailDispatch: PropTypes.func,
  children: PropTypes.any,
  changeEmailProcessing: PropTypes.bool,
  showModal: PropTypes.bool,
  sendOldEmailProcessing: PropTypes.bool,
  confirmOldEmailProcessing: PropTypes.bool,
  locale: PropTypes.string,
  content: PropTypes.string,
  loginData: PropTypes.object,
  verificationCodeError: PropTypes.bool,
  verificationCode: PropTypes.string,
  disabled: PropTypes.bool,
  verificationCodeRequest: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  loginData: makeSelectLoginData(),
  content: selectors.selectContent(),
  showModal: selectors.selectShowModal(),
  changeEmailProcessing: selectors.selectChangeEmailProcessing(),
  sendOldEmailProcessing: selectors.selectSendOldEmailProcessing(),
  confirmOldEmailProcessing: selectors.selectConfirmOldEmailProcessing(),
  email: selectors.selectEmail(),
  isSubscribedEmail: selectors.selectIsSubscribed(),
  verificationCodeError: selectors.selectConfirmOldEmailError(),
  verificationCode: selectors.selectVerificationCode(),
  verificationCodeRequest: selectors.selectVerificationCodeRequest(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    sendAnotherCodeDispatch: bindActionCreators(sendAnotherCode, dispatch),
    changeEmailDispatch: bindActionCreators(changeEmail, dispatch),
    sendOldEmailDispatch: bindActionCreators(sendOldEmail, dispatch),
    confirmOldEmailDispatch: bindActionCreators(confirmOldEmail, dispatch),
    showChangeEmailModalDispatch: bindActionCreators(
      showChangeEmailModal,
      dispatch,
    ),
    hideChangeEmailModalDispatch: bindActionCreators(
      hideChangeEmailModal,
      dispatch,
    ),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'showChangeEmail', reducer });
const withSaga = injectSaga({ key: 'showChangeEmail', saga, mode: DAEMON });

export default compose(withReducer, withSaga, withConnect)(ChangeEmail);
