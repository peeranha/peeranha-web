import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';

import { scrollToErrorField } from 'utils/animation';

import {
  validateEmail,
  strLength254Max,
  strLength15x100,
  required,
  strLength3x20,
} from 'components/FormFields/validate';

import FloatingLabelInput from '../../../containers/HomePage/FloatingLabelInput';
import Button from '../../../containers/HomePage/ContainedButton';
import SelectItem from '../../../containers/HomePage/SelectItem';

import {
  EMAIL_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from '../../../pages/HomePage/constants';

import messages from '../messages';

type SendMessageForm = {
  handleSubmit: any;
  change: () => void;
  sendMessage: () => void;
  sendMessageLoading: boolean;
};

const SendMessageForm: React.FC<SendMessageForm> = ({
  handleSubmit,
  change,
  sendMessageLoading,
  sendMessage,
}): JSX.Element => (
  <form onSubmit={handleSubmit(sendMessage)} autoComplete="off">
    <div>
      <Field
        name={NAME_FIELD}
        disabled={sendMessageLoading}
        label={<FormattedMessage id={messages.yourName.id} />}
        component={FloatingLabelInput}
        validate={[strLength3x20, required]}
        warn={[strLength3x20, required]}
      />

      <Field
        name={EMAIL_FIELD}
        disabled={sendMessageLoading}
        label={<FormattedMessage id={messages.email.id} />}
        component={FloatingLabelInput}
        validate={[validateEmail, required, strLength254Max]}
        warn={[validateEmail, required, strLength254Max]}
      />

      <Field
        name={SUBJECT_FIELD}
        disabled={sendMessageLoading}
        change={change}
        items={['New post', 'Review', 'System error']}
        label={<FormattedMessage id={messages.subject.id} />}
        component={SelectItem}
        validate={[required]}
        warn={[required]}
      />

      <Field
        name={MESSAGE_FIELD}
        multiline
        disabled={sendMessageLoading}
        label={<FormattedMessage id={messages.message.id} />}
        component={FloatingLabelInput}
        validate={[strLength15x100, required]}
        warn={[strLength15x100, required]}
      />
    </div>

    <div className="d-flex">
      <Button>
        <FormattedMessage id={messages.sendMessage.id} />
      </Button>
    </div>
  </form>
);

export default reduxForm({
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(SendMessageForm);
