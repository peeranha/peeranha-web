import React from 'react';
import PropTypes from 'prop-types';
import EmailForm from './EmailForm';
import { SEND_EMAIL_FORM_HEADER } from '../constants';
import messages from '../messages';

const EmailFormModal = ({ translations, checkEmail, emailChecking }) => (
  <div>
    <EmailForm
      form={SEND_EMAIL_FORM_HEADER}
      button={messages.getStarted}
      emailChecking={emailChecking}
      checkEmail={checkEmail}
      translations={translations}
    />
  </div>
);

EmailFormModal.propTypes = {
  emailChecking: PropTypes.bool,
  checkEmail: PropTypes.func,
  showLoginModal: PropTypes.func,
  account: PropTypes.string,
  translations: PropTypes.object,
};

export default React.memo(EmailFormModal);
