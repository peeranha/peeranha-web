import React, { FormEventHandler, useEffect, useRef, useState } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

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
  MESSAGE_FIELD,
} from '../../../pages/HomePage/constants';

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
  const { t } = useTranslation();

  const formBlock = useRef(null);

  const [startFormAnimation, setStartFormAnimation] = useState<boolean>(false);

  useEffect(() => {
    scrollTrigger(formBlock.current, () => setStartFormAnimation(true));
  }, []);

  return (
    <form onSubmit={handleSubmit(sendMessage)} autoComplete="off">
      <div ref={formBlock}>
        <div
          className="op0"
          css={{ ...(startFormAnimation && styles.firstFieldAnimation) }}
        >
          <Field
            name={NAME_FIELD}
            disabled={sendMessageLoading}
            label={t('homePage.yourName')}
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
            label={t('homePage.email')}
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
            name={MESSAGE_FIELD}
            multiline
            disabled={sendMessageLoading}
            label={t('homePage.message')}
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
          {t('homePage.sendMessage')}
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(SendMessageForm);
