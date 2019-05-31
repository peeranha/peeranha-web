import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';

import { getValueFromSearchString } from 'utils/url';

import { validateEmail } from 'components/FormFields/validate';

import DefaultInput from './DefaultInput';
import Button from './ContainedButton';

import { EMAIL_FIELD, REFCODE_FIELD } from './constants';
import messages from './messages';

const EmailLandingForm = /* istanbul ignore next */ ({
  handleSubmit,
  button,
  sendEmailLoading,
  sendEmail,
  translations,
}) => (
  <form onSubmit={handleSubmit(sendEmail)}>
    <Field
      disabled={sendEmailLoading}
      placeholder={translations[messages.email.id]}
      name={EMAIL_FIELD}
      component={DefaultInput}
      validate={[validateEmail]}
      warn={[validateEmail]}
    />

    <Field
      disabled={sendEmailLoading}
      name={REFCODE_FIELD}
      component={DefaultInput}
      placeholder={translations[messages.refCode.id]}
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

const FormClone = reduxForm({})(EmailLandingForm);

export default connect(
  /* istanbul ignore next */ () => ({
    initialValues: {
      [REFCODE_FIELD]: getValueFromSearchString(
        window.location.search,
        'refcode',
      ),
    },
  }),
)(FormClone);
