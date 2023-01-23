import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import presentImage from 'images/2.png';
import { scrollToErrorField } from 'utils/animation';

import { strLength3x20, required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';
import P from 'components/P';
import H4 from 'components/H4';

import { getCookie } from 'utils/cookie';

import { DISPLAY_NAME, REFERRAL_CODE } from './constants';

import { REFERRAL_CODE_URI } from '../App/constants';

const WeAreHappyYouAreHereForm = ({
  handleSubmit,
  finishRegistrationProcessing,
  finishRegistration,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center pb-3">{t('login.weAreHappyYouAreHere')}</H4>

      <div className="text-center">
        <img src={presentImage} alt="present" width="210px" />
        <P className="text-center py-3">{t('login.yourUsernameIsHow')}</P>
      </div>

      <form onSubmit={handleSubmit(finishRegistration)}>
        <Field
          name={DISPLAY_NAME}
          disabled={finishRegistrationProcessing}
          label={t('signUp.displayName')}
          component={TextInputField}
          validate={[strLength3x20, required]}
          warn={[strLength3x20, required]}
        />

        <Button disabled={finishRegistrationProcessing} className="w-100">
          {t('signUp.continue')}
        </Button>
      </form>
    </div>
  );
};

WeAreHappyYouAreHereForm.propTypes = {
  handleSubmit: PropTypes.func,
  finishRegistrationProcessing: PropTypes.bool,
  finishRegistration: PropTypes.func,
};

export default compose(
  connect(() => ({
    initialValues: {
      [REFERRAL_CODE]: getCookie(REFERRAL_CODE_URI),
      [DISPLAY_NAME]: '',
    },
  })),
  reduxForm({
    form: 'WeAreHappyYouAreHereForm',
    onSubmitFail: errors => scrollToErrorField(errors),
  }),
)(WeAreHappyYouAreHereForm);
