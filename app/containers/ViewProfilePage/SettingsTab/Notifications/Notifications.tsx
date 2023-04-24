import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { reduxForm, Field, reset } from 'redux-form/immutable';
import ChangeEmailButton from 'containers/EmailNotifications';
import ToggleSwitch from '../ToogleSwitch';
import { styles } from './Notifications.styled';
import TextInputField from 'components/FormFields/TextInputField';
import {
  validateEmail,
  required,
  strLength254Max,
  checkEmail,
} from 'components/FormFields/validate';
import {
  EMAIL_FIELD,
  EMAIL_FORM,
  CONFIRM_EMAIL_FORM,
} from 'containers/EmailNotifications/constants';

type NotificationsProps = {
  email: string;
  isSubscribedEmail: boolean;
  handleSubmit: () => void;
  showChangeEmailModal: () => void;
  unsubscribeEmail: () => void;
  dispatch: () => void;
};

const Notifications: React.FC<NotificationsProps> = ({
  email,
  isSubscribedEmail,
  handleSubmit,
  showChangeEmailModal,
  unsubscribeEmail,
  dispatch,
}): JSX.Element => {
  const { t } = useTranslation();
  const [isToggled, setIsToggled] = useState<boolean>(isSubscribedEmail);
  const [open, setOpen] = useState<boolean>(Boolean(email));

  const refInput = useRef(null);

  useEffect(() => {
    setOpen(Boolean(email));
    setIsToggled(isSubscribedEmail);
  }, [isSubscribedEmail, email]);

  useEffect(() => {
    dispatch(reset(EMAIL_FORM));
  }, [open]);

  const cancelHandler = (): void => {
    setOpen(!open);
    dispatch(reset(EMAIL_FORM));
  };

  return (
    <>
      <div css={styles.fontSize}>
        <div css={styles.container}>
          <div>
            <div css={styles.emailNotifications}>
              <div>{t('profile.emailNotifications')}</div>
              <div css={styles.secondaryText}>
                {t('profile.emailNotificationsText')}
              </div>
            </div>
          </div>
          <div>
            <ToggleSwitch
              isToggled={isToggled}
              setIsToggled={setIsToggled}
              unsubscribeEmail={unsubscribeEmail}
            />
          </div>
        </div>
        {isToggled && (
          <div css={styles.width}>
            {open ? (
              <div css={styles.confirmedEmail}>
                {t('common.confirmedEmail')}
                <div>
                  <span>{email}</span>
                  <ChangeEmailButton setOpen={setOpen} open={open} />
                </div>
              </div>
            ) : (
              <form
                css={styles.form}
                onSubmit={handleSubmit(showChangeEmailModal)}
              >
                <div>
                  <div css={styles.profileEmail}>{t('profile.email')}</div>

                  <Field
                    ref={refInput}
                    name={EMAIL_FIELD}
                    component={TextInputField}
                    validate={[
                      validateEmail,
                      required,
                      strLength254Max,
                      checkEmail,
                    ]}
                    warn={[validateEmail, required, checkEmail]}
                    placeholder={t('profile.email')}
                    emailTo={email}
                  />
                </div>
                <div>
                  {email && (
                    <button onClick={cancelHandler} css={styles.cancelButton}>
                      {t('common.cancel')}
                    </button>
                  )}
                  <ChangeEmailButton setOpen={setOpen} open={open} />
                </div>
              </form>
            )}
          </div>
        )}
      </div>
      <div css={styles.line}></div>
    </>
  );
};
export default reduxForm({
  form: EMAIL_FORM,
})(Notifications);
