import React from 'react';
import PropTypes from 'prop-types';
import { translationMessages } from 'i18n';
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

import homepageMessages from 'components/HomePage/messages';

import {
  EMAIL_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from 'pages/HomePage/constants';

/* eslint-disable-next-line */
const SendMessageForm = ({
  handleSubmit,
  sendMessageLoading,
  sendMessage,
  locale,
}) => {
  const translations = translationMessages[locale];

  return (
    <FormBox onSubmit={handleSubmit(sendMessage)}>
      <Field
        disabled={sendMessageLoading}
        name={NAME_FIELD}
        component={TextInputField}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
        label={translations[homepageMessages.yourName.id]}
        tip={translations[homepageMessages.yourNameTip.id]}
        splitInHalf
      />

      <Field
        disabled={sendMessageLoading}
        name={EMAIL_FIELD}
        component={TextInputField}
        label={translations[homepageMessages.email.id]}
        tip={translations[homepageMessages.emailTip.id]}
        validate={[validateEmail, required, strLength254Max]}
        warn={[validateEmail, required, strLength254Max]}
        splitInHalf
      />

      <Field
        name={SUBJECT_FIELD}
        placeholder=""
        options={getSelectOptions([
          translations[homepageMessages.askQuestion.id],
          translations[homepageMessages.review.id],
          translations[homepageMessages.systemError.id],
        ])}
        label={translations[homepageMessages.subject.id]}
        tip={translations[homepageMessages.subjectTip.id]}
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
        label={translations[homepageMessages.message.id]}
        tip={translations[homepageMessages.messageTip.id]}
        splitInHalf
      />

      <Button type="submit" disabled={sendMessageLoading}>
        {translations[homepageMessages.sendMessage.id]}
      </Button>
    </FormBox>
  );
};

SendMessageForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendMessageLoading: PropTypes.bool,
  sendMessage: PropTypes.func,
  locale: PropTypes.string,
};

export default reduxForm({
  form: 'SendMessageForm',
})(SendMessageForm);
