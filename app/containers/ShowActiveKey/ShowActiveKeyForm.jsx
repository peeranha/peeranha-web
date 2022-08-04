import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { scrollToErrorField } from 'utils/animation';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';

import { required } from 'components/FormFields/validate';

import { PASSWORD_FIELD } from './constants';

const ShowActiveKeyForm = ({
  handleSubmit,
  showActiveKey,
  showActiveKeyProcessing,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center pb-3">
        {t('common.show')} {t('signUp.eosActivePrivateKey')}
      </H4>

      <form onSubmit={handleSubmit(showActiveKey)}>
        <Field
          name={PASSWORD_FIELD}
          disabled={showActiveKeyProcessing}
          label={t('common.password')}
          component={TextInputField}
          validate={required}
          warn={required}
          type="password"
        />

        <Button disabled={showActiveKeyProcessing} className="w-100 mb-3">
          {t('common.submit')}
        </Button>
      </form>
    </div>
  );
};

ShowActiveKeyForm.propTypes = {
  handleSubmit: PropTypes.func,
  showActiveKey: PropTypes.func,
  showActiveKeyProcessing: PropTypes.bool,
};

export default reduxForm({
  form: 'ShowActiveKeyForm',
  onSubmitFail: errors => scrollToErrorField(errors),
})(ShowActiveKeyForm);
