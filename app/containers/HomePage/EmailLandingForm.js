import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';

import { validateEmail } from 'components/FormFields/validate';

import DefaultInput from './DefaultInput';
import ContainedButton from './ContainedButton';
import HomePage from './index';

import { EMAIL_FIELD } from './constants';

const EmailLandingForm = props => {
  const { handleSubmit, button } = props;

  return (
    <form onSubmit={handleSubmit(HomePage.sendEmail)}>
      <div>
        <Field
          name={EMAIL_FIELD}
          component={DefaultInput}
          validate={[validateEmail]}
          warn={[validateEmail]}
        />
      </div>
      <div>
        <ContainedButton
          type="submit"
          content={<FormattedMessage {...button} />}
        />
      </div>
    </form>
  );
};

EmailLandingForm.propTypes = {
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  translations: PropTypes.object,
  button: PropTypes.object,
};

export default reduxForm({
  form: 'EmailLandingForm',
})(EmailLandingForm);
