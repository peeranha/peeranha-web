import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';

import {
  validateEmail,
  strLength20x100,
  required,
  strLength20,
} from 'components/FormFields/validate';

import FloatingLabelInput from './FloatingLabelInput';
import ContainedButton from './ContainedButton';
import SelectItem from './SelectItem';

import HomePage from './index';

import {
  EMAIL_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from './constants';

import messages from './messages';

const SendMessageForm = props => {
  const { handleSubmit, change, translations } = props;

  return (
    <form onSubmit={handleSubmit(HomePage.sendMessage)} autoComplete="off">
      <div>
        <Field
          name={NAME_FIELD}
          label={<FormattedMessage {...messages.yourName} />}
          component={FloatingLabelInput}
          validate={[strLength20, required]}
          warn={[strLength20, required]}
        />
        <Field
          name={EMAIL_FIELD}
          label={<FormattedMessage {...messages.email} />}
          component={FloatingLabelInput}
          validate={[validateEmail, required]}
          warn={[validateEmail, required]}
        />
        <Field
          change={change}
          name={SUBJECT_FIELD}
          items={[
            translations[messages.askQuestion.id],
            translations[messages.review.id],
            translations[messages.systemError.id],
          ]}
          label={<FormattedMessage {...messages.subject} />}
          component={SelectItem}
          validate={[required]}
          warn={[required]}
        />
        <Field
          name={MESSAGE_FIELD}
          multiline
          label={<FormattedMessage {...messages.message} />}
          component={FloatingLabelInput}
          validate={[strLength20x100, required]}
          warn={[strLength20x100, required]}
        />
      </div>
      <div className="button-submit-wrapper">
        <ContainedButton
          type="submit"
          content={<FormattedMessage {...messages.sendMessage} />}
        />
      </div>
    </form>
  );
};

SendMessageForm.propTypes = {
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  translations: PropTypes.object,
};

export default reduxForm({
  form: 'SendMessageForm',
})(SendMessageForm);
