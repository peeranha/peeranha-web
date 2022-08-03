import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { scrollToErrorField } from 'utils/animation';

import communitySuggestImage from 'images/communitySuggest.svg?inline';

import P from 'components/P';
import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import Checkbox from 'components/Input/Checkbox';
import Button from 'components/Button/Contained/InfoLarge';

import { required } from 'components/FormFields/validate';

import {
  CODE_FIELD,
  PASSWORD_FIELD,
  I_UNDERSTAND_FIELD,
  I_HAVE_BACKUP_FIELD,
} from './constants';

const SubmitEmailForm = ({
  handleSubmit,
  deleteAccount,
  deleteAccountProcessing,
  iUnderstandValue,
  iHaveBackupValue,
  loginWithFacebook,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <H4 className="text-center pb-3">{t('common.areYouLeaving')} </H4>

      <div className="text-center pb-3">
        <img src={communitySuggestImage} alt="check your email" />
        <P className="text-center py-2">{t('signUp.checkYourEmail')}</P>
      </div>

      <form onSubmit={handleSubmit(deleteAccount)}>
        <Field
          name={CODE_FIELD}
          disabled={deleteAccountProcessing}
          label={t('signUp.verificationCode')}
          component={TextInputField}
          validate={required}
          warn={required}
        />

        {!loginWithFacebook && (
          <Field
            name={PASSWORD_FIELD}
            disabled={deleteAccountProcessing}
            label={t('signUp.password')}
            component={TextInputField}
            validate={required}
            warn={required}
            type="password"
          />
        )}

        <div className="my-3">
          <Field
            name={I_UNDERSTAND_FIELD}
            disabled={deleteAccountProcessing}
            label={t('common.iUnderstand')}
            component={Checkbox}
          />
        </div>

        <div className="my-3">
          <Field
            name={I_HAVE_BACKUP_FIELD}
            disabled={deleteAccountProcessing}
            label={t('common.iHaveBackup')}
            component={Checkbox}
          />
        </div>

        <Button
          className="w-100 mb-3"
          disabled={
            deleteAccountProcessing || !iUnderstandValue || !iHaveBackupValue
          }
        >
          {t('common.submit')}
        </Button>
      </form>
    </div>
  );
};

SubmitEmailForm.propTypes = {
  handleSubmit: PropTypes.func,
  deleteAccount: PropTypes.func,
  deleteAccountProcessing: PropTypes.bool,
  iUnderstandValue: PropTypes.bool,
  iHaveBackupValue: PropTypes.bool,
  loginWithFacebook: PropTypes.bool,
};

const formName = 'SubmitEmailForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
  onSubmitFail: errors => scrollToErrorField(errors),
})(SubmitEmailForm);

FormClone = connect(
  /* istanbul ignore next */ state => {
    const form = state.toJS().form[formName] || { values: {} };

    return {
      iUnderstandValue: form.values ? form.values[I_UNDERSTAND_FIELD] : false,
      iHaveBackupValue: form.values ? form.values[I_HAVE_BACKUP_FIELD] : false,
    };
  },
)(FormClone);

export default FormClone;
