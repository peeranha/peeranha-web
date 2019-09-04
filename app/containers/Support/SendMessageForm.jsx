import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { translationMessages } from 'i18n';
import { Field, reduxForm } from 'redux-form/immutable';

import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';

import SelectField, {
  getSelectOptions,
} from 'components/FormFields/SelectField';

import Button from 'components/Button/Contained/InfoLarge';

import {
  validateEmail,
  required,
  strLength20x1000,
  strLength15x100,
} from 'components/FormFields/validate';

import homepageMessages from 'containers/HomePage/messages';

import {
  EMAIL_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from 'containers/HomePage/constants';

const Form = styled.form`
  padding: 50px 0px 50px 30px;
`;

/* eslint-disable-next-line */
const SendMessageForm = ({
  handleSubmit,
  sendMessageLoading,
  sendMessage,
  locale,
}) => {
  const translations = translationMessages[locale];

  return (
    <Form onSubmit={handleSubmit(sendMessage)}>
      <Field
        disabled={sendMessageLoading}
        name={NAME_FIELD}
        component={TextInputField}
        validate={[strLength15x100, required]}
        warn={[strLength15x100, required]}
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
        validate={[validateEmail, required]}
        warn={[validateEmail, required]}
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

      <Button className="my-3" disabled={sendMessageLoading}>
        {translations[homepageMessages.sendMessage.id]}
      </Button>
    </Form>
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
