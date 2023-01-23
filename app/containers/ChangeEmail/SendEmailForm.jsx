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

import { OLD_EMAIL_FORM, OLD_EMAIL_FIELD } from './constants';

const EmailForm = ({ handleSubmit, sendOldEmail, sendOldEmailProcessing }) => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center pb-3">
        {t('common.change')} {t('signUp.email')}
      </H4>

      <form onSubmit={handleSubmit(sendOldEmail)}>
        <Field
          name={OLD_EMAIL_FIELD}
          disabled
          label={t('signUp.email')}
          component={TextInputField}
          validate={[validateEmail, required]}
          warn={[validateEmail, required]}
        />

        <Button disabled={sendOldEmailProcessing} className="w-100 mb-3">
          {t('common.submit')}
        </Button>
      </form>
    </div>
  );
};

EmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendOldEmail: PropTypes.func,
  sendOldEmailProcessing: PropTypes.bool,
};

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: OLD_EMAIL_FORM,
  onSubmitFail: errors => scrollToErrorField(errors),
})(EmailForm);

FormClone = connect((_, props) => ({
  enableReinitialize: true,
  initialValues: {
    [OLD_EMAIL_FIELD]: props.loginData.email,
  },
}))(FormClone);

export default FormClone;
