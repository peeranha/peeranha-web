import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form/immutable';

import { scrollToErrorField } from 'utils/animation';

import {
  validateEmail,
  strLength254Max,
  strLength15x100,
  required,
  strLength3x20,
} from 'components/FormFields/validate';

import FloatingLabelInput from './FloatingLabelInput';
import Button from './ContainedButton';
import SelectItem from './SelectItem';

import {
  EMAIL_FIELD,
  NAME_FIELD,
  SUBJECT_FIELD,
  MESSAGE_FIELD,
} from './constants';

const SendMessageForm = props => {
  const { t } = useTranslation();
  const { handleSubmit, change, sendMessageLoading, sendMessage } = props;

  return (
    <form onSubmit={handleSubmit(sendMessage)} autoComplete="off">
      <div>
        <Field
          name={NAME_FIELD}
          disabled={sendMessageLoading}
          label={t('about.yourName')}
          component={FloatingLabelInput}
          validate={[strLength3x20, required]}
          warn={[strLength3x20, required]}
        />

        <Field
          name={EMAIL_FIELD}
          disabled={sendMessageLoading}
          label={t('about.email')}
          component={FloatingLabelInput}
          validate={[validateEmail, required, strLength254Max]}
          warn={[validateEmail, required, strLength254Max]}
        />

        <Field
          disabled={sendMessageLoading}
          change={change}
          name={SUBJECT_FIELD}
          items={[
            t('about.askQuestion'),
            t('about.review'),
            t('about.systemError'),
          ]}
          label={t('about.subject')}
          component={SelectItem}
          validate={[required]}
          warn={[required]}
        />

        <Field
          name={MESSAGE_FIELD}
          multiline
          disabled={sendMessageLoading}
          label={t('about.message')}
          component={FloatingLabelInput}
          validate={[strLength15x100, required]}
          warn={[strLength15x100, required]}
        />
      </div>

      <div className="d-flex">
        <Button>{t('about.sendMessage')}</Button>
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

export default reduxForm({
  onSubmitFail: errors => scrollToErrorField(errors),
})(SendMessageForm);
