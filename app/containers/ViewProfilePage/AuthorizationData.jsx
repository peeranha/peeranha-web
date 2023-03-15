import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { reduxForm, Field } from 'redux-form/immutable';

import H3 from 'components/H3';
import Span from 'components/Span';
import ChangeEmailButton from '../ChangeEmail';
import ToggleSwitch from '../../components/ToogleSwitch';
import TextInputField from 'components/FormFields/TextInputField';
import Button from 'components/Button/Contained/Transparent';
import { META_TRANSACTIONS_ALLOWED } from 'utils/constants';
import { deleteCookie, setCookie, getCookie } from 'utils/cookie';
import { TEXT_SECONDARY } from 'style-constants';
import {
  validateEmail,
  required,
  strLength254Max,
} from 'components/FormFields/validate';
import { OLD_EMAIL_FIELD } from '../ChangeEmail/constants';
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
}) => {
  const { t } = useTranslation();
  const [isToggled, setIsToggled] = useState(false);
  const metaTransactionsAllowed = getCookie(META_TRANSACTIONS_ALLOWED);
  const [open, setOpen] = useState(isSubscribedEmail);
  const [metaTransactions, setMetaTransactions] = React.useState(
    metaTransactionsAllowed,
  );
  const refInput = useRef(null);
  const isCheckEmail = refInput?.current?.value === email;

  useEffect(() => {
    setOpen(isSubscribedEmail);
    setIsToggled(isSubscribedEmail);
  }, [isSubscribedEmail, email]);

  const handleMetaTransactionsAllowed = () => {
    setCookie({
      name: META_TRANSACTIONS_ALLOWED,
      value: true,
      options: {
        neverExpires: true,
        defaultPath: true,
        allowSubdomains: true,
      },
    });
    setMetaTransactions(true);
  };

  const handleMetaTransactionsDisallowed = () => {
    deleteCookie(META_TRANSACTIONS_ALLOWED);
    setMetaTransactions(false);
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
              className="df jcsb"
              css={{ margin: '36px  0 12px 0', maxWidth: '450px' }}
            >
              <div>
                <div className="df aic fww mb-2">
                  <div className="full-width semi-bold mb-2">
                    {' '}
                    {t('profile.emailNotifications')}
                  </div>
                  <div
                    css={{ fontSize: '16px', color: 'var(--color-gray-dark)' }}
                  >
                    {t('profile.emailNotificationsText')}
                  </div>
                </div>
              </div>
              <div>
                <ToggleSwitch
                  isToggled={isToggled}
                  setIsToggled={setIsToggled}
                />
              </div>
            </div>
            {isToggled && (
              <div css={{ maxWidth: '450px' }}>
                {open ? (
                  <div className="semi-bold">
                    {t('common.confirmedEmail')}
                    <div className="df aic jcsb mt-2">
                      <span
                        className="light"
                        css={{ color: 'var(--color-gray-dark)' }}
                      >
                        {email}
                      </span>
                      <ChangeEmailButton setOpen={setOpen} open={open} />
                    </div>
                  </div>
                ) : (
                  <form
                    className="df jcsb fww"
                    onSubmit={handleSubmit(showChangeEmailModal)}
                  >
                    <div
                      className="w-100"
                      css={
                        isCheckEmail && {
                          input: {
                            border: '1px solid #F76F60',
                            boxShadow: '0 0 0 3px rgba(255, 0, 0, 0.40)',
                          },
                        }
                      }
                    >
                      <div className="semi-bold mb-2">{t('profile.email')}</div>

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
                        className="mb-3 fz14 w-100"
                        css={{ color: '#F76F60', fontStyle: 'italic' }}
                      >
                        {t('signUp.emailSubscribed')}
                      </div>
                    )}
                    <div>
                      {email && (
                        <Button
                          onClick={() => setOpen(!open)}
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
                      <ChangeEmailButton disabled={isCheckEmail} />
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
          <div
            css={{ height: '1px', background: '#C2C6D8', marginTop: '25px' }}
          ></div>
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
  form: OLD_EMAIL_FIELD,
  onSubmitFail: (errors) => {
    scrollToErrorField(errors);
  },
})(AuthorizationData);
