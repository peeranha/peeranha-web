import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form/immutable';

import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';
import FormBox from 'components/Form';

import SelectField, {
  getSelectOptions,
} from 'components/FormFields/SelectField';

import Button from 'components/Button/Contained/InfoLarge';

import {
  validateEmail,
  strLength254Max,
  required,
  strLength20x1000,
  strLength3x20,
} from 'components/FormFields/validate';

import {
  EMAIL_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from 'containers/HomePage/constants';

const SendMessageForm = ({ handleSubmit, sendMessageLoading, sendMessage }) => {
  const { t } = useTranslation();
  const sendMessageHandler = (...data) => {
    sendMessage(...data, t);
  };

  return (
    <FormBox onSubmit={handleSubmit(sendMessageHandler)}>
      <Field
        disabled={sendMessageLoading}
        name={NAME_FIELD}
        component={TextInputField}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
        label={t('about.yourName')}
        tip={t('about.yourNameTip')}
        splitInHalf
      />

      <Field
        disabled={sendMessageLoading}
        name={EMAIL_FIELD}
        component={TextInputField}
        label={t('about.email')}
        tip={t('about.emailTip')}
        validate={[validateEmail, required, strLength254Max]}
        warn={[validateEmail, required, strLength254Max]}
        splitInHalf
      />

      <Field
        name={SUBJECT_FIELD}
        placeholder=""
        options={getSelectOptions([
          t('about.askQuestion'),
          t('about.review'),
          t('about.systemError'),
        ])}
        label={t('about.subject')}
        tip={t('about.subjectTip')}
        disabled={sendMessageLoading}
        component={SelectField}
        validate={[required]}
        warn={[required]}
        splitInHalf
      />

      <Field
        disabled={sendMessageLoading}
        name={MESSAGE_FIELD}
        component={TextareaField}
        validate={[strLength20x1000, required]}
        warn={[strLength20x1000, required]}
        label={t('about.message')}
        tip={t('about.messageTip')}
        splitInHalf
      />

      <Button type="submit" disabled={sendMessageLoading}>
        {t('about.sendMessage')}
      </Button>
    </FormBox>
  );
};

SendMessageForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendMessageLoading: PropTypes.bool,
  sendMessage: PropTypes.func,
};

export default reduxForm({
  form: 'SendMessageForm',
})(SendMessageForm);
