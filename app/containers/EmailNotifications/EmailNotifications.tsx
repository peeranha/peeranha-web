import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { t } from 'i18next';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import Modal from 'components/ModalDialog';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import SendEmailForm from './SendEmailForm';
import ChangeEmailForm from './ChangeEmailForm';
import ConfirmEmailForm from './ConfirmEmailForm';

import {
  sendEmail,
  confirmEmail,
  showChangeEmailModal,
  hideChangeEmailModal,
  sendAnotherCode,
} from './actions';

import {
  EMAIL_FORM,
  CONFIRM_EMAIL_FORM,
  CHANGE_EMAIL_FORM,
  SEND_EMAIL_FORM,
  ENTER_EMAIL_FORM,
} from './constants';
import { singleCommunityColors } from 'utils/communityManagement';
import EditIcon from 'icons/Edit';
import { styles } from './EmailNotifications.styled';

import { EmailNotificationsProps, EmailNotificationsSelectorsProps } from './types';

const colors = singleCommunityColors();

const EmailNotifications: React.FC<EmailNotificationsProps> = ({
  hideChangeEmailModalDispatch,
  showModal,
  content,
  sendEmailDispatch,
  confirmEmailProcessing,
  confirmEmailDispatch,
  sendEmailProcessing,
  sendAnotherCodeDispatch,
  setOpen,
  open,
  verificationCodeError,
  verificationCode,
  verificationCodeRequest,
}): JSX.Element => {
  const [emailAddress, setEmailAddress] = useState<null | string>(null);

  const clickEmailHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setEmailAddress(event.target.form[0].value);
  };
  const clickButtonHandler = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const closeModal = useCallback(() => {
    setOpen(true);
    hideChangeEmailModalDispatch();
  }, [open, content]);

  return (
    <>
      <Modal show={showModal} closeModal={closeModal}>
        {content === SEND_EMAIL_FORM && (
          <SendEmailForm
            sendEmail={sendEmailDispatch}
            sendEmailProcessing={sendEmailProcessing}
            closeModal={hideChangeEmailModalDispatch}
            emailAddress={emailAddress}
          />
        )}

        {content === CONFIRM_EMAIL_FORM && (
          <ConfirmEmailForm
            confirmEmail={confirmEmailDispatch}
            confirmEmailProcessing={confirmEmailProcessing}
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
        <button onClick={clickEmailHandler} type="submit" css={styles.confirmButton}>
          {t('common.telegram.confirm')}
        </button>
      ) : (
        <button css={styles.transparentButton} onClick={clickButtonHandler}>
          <EditIcon stroke={colors.btnColor} fill={colors.btnColor} />
          {t('common.edit')}
        </button>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector<any, EmailNotificationsSelectorsProps>({
  content: selectors.selectContent(),
  showModal: selectors.selectShowModal(),
  sendEmailProcessing: selectors.selectSendEmailProcessing(),
  confirmEmailProcessing: selectors.selectConfirmEmailProcessing(),
  verificationCodeError: selectors.selectVerificationCodeError(),
  verificationCode: selectors.selectVerificationCode(),
  verificationCodeRequest: selectors.selectVerificationCodeRequest(),
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    sendAnotherCodeDispatch: bindActionCreators(sendAnotherCode, dispatch),
    sendEmailDispatch: bindActionCreators(sendEmail, dispatch),
    confirmEmailDispatch: bindActionCreators(confirmEmail, dispatch),
    hideChangeEmailModalDispatch: bindActionCreators(hideChangeEmailModal, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'emailNotificationsReducer',
  reducer,
});
const withSaga = injectSaga({
  key: 'emailNotificationsReducer',
  saga,
  mode: DAEMON,
});

export default compose(withReducer, withSaga, withConnect)(EmailNotifications);
