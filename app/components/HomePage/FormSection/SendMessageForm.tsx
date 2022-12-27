import React, { FormEventHandler, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';

import { scrollToErrorField, scrollTrigger } from 'utils/animation';

import {
  validateEmail,
  strLength254Max,
  strLength15x100,
  required,
  strLength3x20,
} from 'components/FormFields/validate';

import {
  EMAIL_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from '../../../pages/HomePage/constants';

import messages from '../messages';
import FormField from './FormField';
import { styles } from './FormSection.styled';

type SendMessageForm = {
  handleSubmit: (
    sendMessage: () => void,
  ) => FormEventHandler<HTMLFormElement> | undefined;
  sendMessage: () => void;
  sendMessageLoading: boolean;
};

const SendMessageForm: React.FC<SendMessageForm> = ({
  handleSubmit,
  sendMessageLoading,
  sendMessage,
}): JSX.Element => {
  const [startFormAnimation, setStartFormAnimation] = useState<boolean>(false);

  useEffect(() => {
    scrollTrigger('.letter-form', () => setStartFormAnimation(true));
  }, []);

  return (
    <form onSubmit={handleSubmit(sendMessage)} autoComplete="off">
      <div className="letter-form">
        <div
          className="op0"
          css={{ ...(startFormAnimation && styles.firstFieldAnimation) }}
        >
          <Field
            name={NAME_FIELD}
            disabled={sendMessageLoading}
            label={<FormattedMessage id={messages.yourName.id} />}
            component={FormField}
            validate={[strLength3x20, required]}
            warn={[strLength3x20, required]}
          />
        </div>
        <div
          className="op0"
          css={{ ...(startFormAnimation && styles.secondFieldAnimation) }}
        >
          <Field
            name={EMAIL_FIELD}
            disabled={sendMessageLoading}
            label={<FormattedMessage id={messages.email.id} />}
            component={FormField}
            validate={[validateEmail, required, strLength254Max]}
            warn={[validateEmail, required, strLength254Max]}
          />
        </div>
        <div
          className="op0"
          css={{ ...(startFormAnimation && styles.thirdFieldAnimation) }}
        >
          <Field
            name={SUBJECT_FIELD}
            disabled={sendMessageLoading}
            label={<FormattedMessage id={messages.subject.id} />}
            component={FormField}
            validate={[strLength3x20, required]}
            warn={[strLength3x20, required]}
          />
        </div>
        <div
          className="op0"
          css={{ ...(startFormAnimation && styles.fourthFieldAnimation) }}
        >
          <Field
            name={MESSAGE_FIELD}
            multiline
            disabled={sendMessageLoading}
            label={<FormattedMessage id={messages.message.id} />}
            component={FormField}
            validate={[strLength15x100, required]}
            warn={[strLength15x100, required]}
          />
        </div>
        <button
          className="full-width fz18 mt8 op0"
          css={{
            ...styles.button,
            ...(startFormAnimation && styles.buttonFieldAnimation),
          }}
        >
          <FormattedMessage id={messages.sendMessage.id} />
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(SendMessageForm);
