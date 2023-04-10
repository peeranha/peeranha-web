import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { reduxForm, Field, reset } from 'redux-form/immutable';
import TransactionHandler from './TransactionHandler';
import H3 from 'components/H3';
import ChangeEmailButton from 'containers/ChangeEmail';
import ToggleSwitch from 'components/ToogleSwitch';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/Transparent';
import { TYPE_OF_TRANSACTIONS } from 'utils/constants';
import { getCookie } from 'utils/cookie';
import { TEXT_SECONDARY } from 'style-constants';
import {
  validateEmail,
  required,
  strLength254Max,
} from 'components/FormFields/validate';
import { OLD_EMAIL_FIELD, EMAIL_FORM } from '../ChangeEmail/constants';
import { scrollToErrorField } from 'utils/animation';

import { BaseStyled } from './SettingsOfUser';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const AuthorizationData = ({
  className,
  email,
  isSubscribedEmail,
  handleSubmit,
  showChangeEmailModal,
  dispatch,
}) => {
  const { t } = useTranslation();
  const [isToggled, setIsToggled] = useState(false);
  const [open, setOpen] = useState(isSubscribedEmail);
  const dataFromCookies = getCookie(TYPE_OF_TRANSACTIONS);
  const [transaction, setTransaction] = useState(dataFromCookies);
  const refInput = useRef(null);
  const isCheckEmail = refInput?.current?.value === email;
  const emailFormInput = Boolean(refInput?.current?.value);

  useEffect(() => {
    setOpen(isSubscribedEmail);
    setIsToggled(isSubscribedEmail);
  }, [isSubscribedEmail, email]);

  useEffect(() => {
    if (isSubscribedEmail && !isToggled) {
      setOpen(true);
    }
  }, [isToggled]);

  const cancelHandler = () => {
    setOpen(!open);
    dispatch(reset(EMAIL_FORM));
  };

  return (
    <>
      <BaseStyled
        className={className}
        position="bottom"
        css={css`
      border-top-left-radius: 0; !important;
      border-top-right-radius: 0; !important;
    `}
      >
        <H3>{t('common.settings')}</H3>
      </BaseStyled>
      <BaseStyled position="top" className={className}>
        <div>
          <div css={{ fontSize: '18px' }}>
            <div
              css={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '36px  0 12px 0',
                maxWidth: '450px',
              }}
            >
              <div>
                <div
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '5px',
                  }}
                >
                  <div
                    css={{
                      width: '100%',
                      marginBottom: '5px',
                      fontWeight: 600,
                    }}
                  >
                    {t('profile.emailNotifications')}
                  </div>
                  <div css={{ fontSize: '16px', color: TEXT_SECONDARY }}>
                    {t('profile.emailNotificationsText')}
                  </div>
                </div>
              </div>
              <div>
                <ToggleSwitch
                  isToggled={isToggled}
                  setIsToggled={setIsToggled}
                  onClick={() => {
                    if (isToggled) {
                      setOpen(true);
                    }
                  }}
                />
              </div>
            </div>
            {isToggled && (
              <div css={{ maxWidth: '450px' }}>
                {open ? (
                  <div css={{ fontWeight: 600 }}>
                    {t('common.confirmedEmail')}
                    <div
                      css={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '5px',
                      }}
                    >
                      <span className="light" css={{ color: TEXT_SECONDARY }}>
                        {email}
                      </span>
                      <ChangeEmailButton setOpen={setOpen} open={open} />
                    </div>
                  </div>
                ) : (
                  <form
                    css={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      '> div': {
                        width: '100%',
                      },
                    }}
                    onSubmit={handleSubmit(showChangeEmailModal)}
                  >
                    <div
                      css={
                        isCheckEmail && {
                          input: {
                            border: '1px solid #F76F60',
                            boxShadow: '0 0 0 3px rgba(252,102,85,0.40)',
                          },
                          'input:focus': {
                            border: '1px solid #F76F60',
                            boxShadow: '0 0 0 3px rgba(252,102,85,0.40)',
                          },
                        }
                      }
                    >
                      <div css={{ marginBottom: '5px', fontWeight: 600 }}>
                        {t('profile.email')}
                      </div>

                      <Field
                        ref={refInput}
                        name={OLD_EMAIL_FIELD}
                        component={TextInputField}
                        validate={[validateEmail, required, strLength254Max]}
                        warn={[validateEmail, required]}
                        placeholder={t('profile.email')}
                        css={{ border: 'solid 1px #F76F60' }}
                      />
                    </div>
                    {isCheckEmail && (
                      <div
                        css={{
                          fontSize: '14px',
                          width: '100%',
                          marginBottom: '10px',
                          color: '#F76F60',
                          fontStyle: 'italic',
                        }}
                      >
                        {t('signUp.emailSubscribed')}
                      </div>
                    )}
                    <div>
                      {email && (
                        <Button
                          onClick={cancelHandler}
                          css={{
                            border: '1px solid #F76F60',
                            width: '86px',
                            height: '40px',
                            color: '#F76F60',
                            marginRight: '12px',
                            borderRadius: '2px',
                          }}
                        >
                          {t('common.cancel')}
                        </Button>
                      )}
                      <ChangeEmailButton
                        disabled={isCheckEmail || !emailFormInput}
                      />
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
          <div
            css={{ height: '1px', background: '#C2C6D8', margin: '25px 0' }}
          ></div>
          <TransactionHandler
            transaction={transaction}
            setTransaction={setTransaction}
            settings
          />
        </div>
      </BaseStyled>
    </>
  );
};

AuthorizationData.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string,
  isSubscribedEmail: PropTypes.bool,
  handleSubmit: PropTypes.func,
  showChangeEmailModal: PropTypes.func,
};

export default reduxForm({
  form: EMAIL_FORM,
  onSubmitFail: (errors) => {
    scrollToErrorField(errors);
  },
})(AuthorizationData);
