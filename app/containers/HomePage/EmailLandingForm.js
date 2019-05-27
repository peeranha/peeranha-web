import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';

import { validateEmail } from 'components/FormFields/validate';

import DefaultInput from './DefaultInput';
import Button from './ContainedButton';

import { EMAIL_FIELD } from './constants';

const EmailLandingForm = /* istanbul ignore next */ ({
  handleSubmit,
  button,
  sendEmailLoading,
  sendEmail,
}) => (
  <form onSubmit={handleSubmit(sendEmail)}>
    <Field
      disabled={sendEmailLoading}
      name={EMAIL_FIELD}
      component={DefaultInput}
      validate={[validateEmail]}
      warn={[validateEmail]}
    />

    <div className="d-flex">
      <Button disabled={sendEmailLoading} typeAttr="submit">
        <FormattedMessage {...button} />
      </Button>
    </div>
  </form>
);

EmailLandingForm.propTypes = {
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  sendEmail: PropTypes.func,
  translations: PropTypes.object,
  button: PropTypes.object,
  sendEmailLoading: PropTypes.bool,
};

export default reduxForm({})(EmailLandingForm);
