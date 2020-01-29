import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';

import presentImage from 'images/2.png';
import { scrollToErrorField } from 'utils/animation';

import {
  strLength3x20,
  strLength12Max,
  required,
} from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import P from 'components/P';
import H4 from 'components/H4';

import signupMessages from 'containers/SignUp/messages';

import { DISPLAY_NAME, REFERRAL_CODE } from './constants';

import loginMessages from './messages';
import { getCookie } from '../../utils/cookie';
import { REFERRAL_CODE_URI } from '../App/constants';

const WeAreHappyYouAreHereForm = ({
  handleSubmit,
  locale,
  finishRegistrationProcessing,
  finishRegistration,
}) => (
  <div>
    <H4 className="text-center pb-3">
      <FormattedMessage {...loginMessages.weAreHappyYouAreHere} />
    </H4>

    <div className="text-center">
      <img src={presentImage} alt="present" width="210px" />
      <P className="text-center py-3">
        <FormattedMessage {...loginMessages.yourUsernameIsHow} />
      </P>
    </div>

    <form onSubmit={handleSubmit(finishRegistration)}>
      <Field
        name={DISPLAY_NAME}
        disabled={finishRegistrationProcessing}
        label={translationMessages[locale][signupMessages.displayName.id]}
        component={TextInputField}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
      />

      <P className="text-center py-3">
        <FormattedMessage {...loginMessages.referralMessage} />
      </P>
      <Field
        name={REFERRAL_CODE}
        disabled={finishRegistrationProcessing}
        label={translationMessages[locale][signupMessages.referralCode.id]}
        component={TextInputField}
        validate={[strLength12Max]}
      />
      <Button disabled={finishRegistrationProcessing} className="w-100">
        <FormattedMessage {...signupMessages.continue} />
      </Button>
    </form>
  </div>
);

WeAreHappyYouAreHereForm.propTypes = {
  handleSubmit: PropTypes.func,
  locale: PropTypes.string,
  finishRegistrationProcessing: PropTypes.bool,
  finishRegistration: PropTypes.func,
};

export default compose(
  connect(() => ({
    initialValues: {
      [REFERRAL_CODE]: getCookie(REFERRAL_CODE_URI),
    },
  })),
  reduxForm({
    form: 'WeAreHappyYouAreHereForm',
    onSubmitFail: errors => scrollToErrorField(errors),
  }),
)(WeAreHappyYouAreHereForm);
