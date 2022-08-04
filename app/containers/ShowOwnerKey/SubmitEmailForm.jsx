import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { scrollToErrorField } from 'utils/animation';

import letterImg from 'images/letter-smile.svg?inline';

import P from 'components/P';
import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/InfoLarge';

import { required } from 'components/FormFields/validate';

import { CODE_FIELD, SUBMIT_EMAIL_FORM } from './constants';

const ShowOwnerKeyForm = ({
  handleSubmit,
  showOwnerKey,
  showOwnerKeyProcessing,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center pb-3">
        {t('common.show')} {t('signUp.eosOwnerPrivateKey')}
      </H4>

      <div className="text-center pb-3">
        <img src={letterImg} alt="check your email" />
        <P className="text-center py-2">{t('signUp.checkYourEmail')}</P>
      </div>

      <form onSubmit={handleSubmit(showOwnerKey)}>
        <Field
          name={CODE_FIELD}
          disabled={showOwnerKeyProcessing}
          label={t('signUp.verificationCode')}
          component={TextInputField}
          validate={required}
          warn={required}
        />

        <Button disabled={showOwnerKeyProcessing} className="w-100 mb-3">
          {t('common.submit')}
        </Button>
      </form>
    </div>
  );
};

ShowOwnerKeyForm.propTypes = {
  handleSubmit: PropTypes.func,
  showOwnerKey: PropTypes.func,
  showOwnerKeyProcessing: PropTypes.bool,
};

export default reduxForm({
  form: SUBMIT_EMAIL_FORM,
  onSubmitFail: errors => scrollToErrorField(errors),
})(ShowOwnerKeyForm);
