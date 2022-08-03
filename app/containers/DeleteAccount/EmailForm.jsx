import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { scrollToErrorField } from 'utils/animation';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';

import { validateEmail, required } from 'components/FormFields/validate';

import { EMAIL_FIELD, EMAIL_FORM } from './constants';

const EmailForm = ({ handleSubmit, sendEmail, sendEmailProcessing }) => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center pb-3">{t('common.deleteAccount')}</H4>

      <form onSubmit={handleSubmit(sendEmail)}>
        <Field
          name={EMAIL_FIELD}
          disabled
          label={t('signUp.email')}
          component={TextInputField}
          validate={[validateEmail, required]}
          warn={[validateEmail, required]}
        />

        <Button disabled={sendEmailProcessing} className="w-100 mb-3">
          {t('common.submit')}
        </Button>
      </form>
    </div>
  );
};

EmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendEmail: PropTypes.func,
  sendEmailProcessing: PropTypes.bool,
};

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: EMAIL_FORM,
  onSubmitFail: errors => scrollToErrorField(errors),
})(EmailForm);

FormClone = connect((_, props) => ({
  enableReinitialize: true,
  initialValues: {
    [EMAIL_FIELD]: props.loginData.email,
  },
}))(FormClone);

export default FormClone;
