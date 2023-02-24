/**
 *
 * ChangeEmail
 *
 */

import React from 'react';
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
  emailAddress,
  email,
  // isSubscribedEmail,
  setOpen,
  open,
}) => {
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
            emailAddress={email}
          />
        )}

        {content === CHANGE_EMAIL_FORM && (
          <ChangeEmailForm
            locale={locale}
            changeEmail={changeEmailDispatch}
            changeEmailProcessing={changeEmailProcessing}
            emailAddress={emailAddress}
          />
        )}
      </Modal>
      {!open ? (
        <Button
          onClick={showChangeEmailModalDispatch}
          type="submit"
          css={{
            border: '1px solid #F76F60',
            width: '86px',
            height: '40px',
            color: '#F76F60',
          }}
        >
          {t('common.telegram.confirm')}
        </Button>
      ) : (
        <Button onClick={() => setOpen(!open)}>
          <EditIcon
            className="mr-1"
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
