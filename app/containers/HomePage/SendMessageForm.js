import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';

import {
  validateEmail,
  strLength15x100,
  required,
  strLength3x20,
} from 'components/FormFields/validate';

import FloatingLabelInput from './FloatingLabelInput';
import ContainedButton from './ContainedButton';
import SelectItem from './SelectItem';

import {
  EMAIL_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from './constants';

import messages from './messages';

const SendMessageForm = /* istanbul ignore next */ props => {
  const {
    handleSubmit,
    change,
    translations,
    sendMessageLoading,
    sendMessage,
  } = props;

  return (
    <form onSubmit={handleSubmit(sendMessage)} autoComplete="off">
      <div>
        <Field
          name={NAME_FIELD}
          disabled={sendMessageLoading}
          label={<FormattedMessage {...messages.yourName} />}
          component={FloatingLabelInput}
          validate={[strLength3x20, required]}
          warn={[strLength3x20, required]}
        />
        <Field
          name={EMAIL_FIELD}
          disabled={sendMessageLoading}
          label={<FormattedMessage {...messages.email} />}
          component={FloatingLabelInput}
          validate={[validateEmail, required]}
          warn={[validateEmail, required]}
        />
        <Field
          disabled={sendMessageLoading}
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
          disabled={sendMessageLoading}
          label={<FormattedMessage {...messages.message} />}
          component={FloatingLabelInput}
          validate={[strLength15x100, required]}
          warn={[strLength15x100, required]}
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
  sendMessage: PropTypes.func,
  translations: PropTypes.object,
  sendMessageLoading: PropTypes.bool,
};

export default reduxForm({})(SendMessageForm);
