import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { reduxForm, Field } from 'redux-form/immutable';

import H3 from 'components/H3';
import Span from 'components/Span';
import ChangeEmailButton from '../ChangeEmail';
import ToggleSwitch from '../../components/ToogleSwitch';
import TextInputField from 'components/FormFields/TextInputField';

import commonMessages from 'common-messages';
import { META_TRANSACTIONS_ALLOWED } from 'utils/constants';
import { deleteCookie, setCookie, getCookie } from 'utils/cookie';
import { TEXT_SECONDARY } from 'style-constants';
import {
  validateEmail,
  required,
  withoutDoubleSpace,
  strLength5x100,
  maxByteLength,
} from 'components/FormFields/validate';
import { OLD_EMAIL_FIELD, CONFIRM_EMAIL_FORM } from '../ChangeEmail/constants';
import { scrollToErrorField } from 'utils/animation';

import { BaseStyled } from './SettingsOfUser';
import { TYPE_OF_TRANSACTIONS } from 'utils/constants';

const AuthorizationData = ({
  className,
  email,
  isSubscribedEmail,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  const [isToggled, setIsToggled] = useState(false);
  const [emailAddress, setEmailAddress] = useState(null);
  const metaTransactionsAllowed = getCookie(META_TRANSACTIONS_ALLOWED);
  const [open, setOpen] = useState(isSubscribedEmail);
  const [metaTransactions, setMetaTransactions] = React.useState(
    metaTransactionsAllowed,
  );

  useEffect(() => {
    setIsToggled(isSubscribedEmail);
  }, [isSubscribedEmail]);

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

  const getEmail = (e) => {
    e.preventDefault();
    setEmailAddress(e.target[0].value);
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
      <BaseStyled position="top" notRoundedStyle className={className}>
        <div>
          <div css={{ fontSize: '18px' }}>
            <div
              className="df jcsb"
              css={{ margin: '36px  0 12px 0', maxWidth: '450px' }}
            >
              <div>
                <div className="df aic fww mb-2">
                  <div className="full-width semi-bold mb-1">
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
                    <div className="df aic jcsb mt-1">
                      <span
                        className="light"
                        css={{ color: 'var(--color-gray-dark)' }}
                      >
                        {email}
                      </span>
                      <ChangeEmailButton
                        emailAddress={emailAddress}
                        setOpen={setOpen}
                        open={open}
                      />
                    </div>
                  </div>
                ) : (
                  <form
                    className="df jcsb fww"
                    onSubmit={handleSubmit(getEmail)}
                  >
                    <div className="semi-bold" css={{ width: '350px' }}>
                      {t('profile.email')}

                      <Field
                        name={OLD_EMAIL_FIELD}
                        component={TextInputField}
                        validate={[
                          withoutDoubleSpace,
                          strLength5x100,
                          maxByteLength,
                          required,
                        ]}
                        warn={[validateEmail, required]}
                        placeholder={t('profile.email')}
                      />
                    </div>
                    <div
                      css={{
                        '@media only screen and (min-width: 435px)': {
                          marginTop: '24px',
                        },
                      }}
                    >
                      <ChangeEmailButton emailAddress={emailAddress} />
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
        <div>
          <div>
            <div className="mb-4">
              <div className="mb-2">
                <Span fontSize="18" bold>
                  <FormattedMessage id={commonMessages.transactions.id} />
                </Span>
              </div>
              <div>
                <div>
                  <Span
                    css={css`
                      color: ${TEXT_SECONDARY};
                    `}
                    fontSize="14"
                  >
                    <FormattedMessage
                      id={commonMessages.transactionsText_1.id}
                    />
                  </Span>
                </div>
                <div>
                  <Span
                    css={css`
                      color: ${TEXT_SECONDARY};
                    `}
                    fontSize="14"
                  >
                    <FormattedMessage
                      id={commonMessages.transactionsText_2.id}
                    />
                  </Span>
                </div>
              </div>
            </div>
          </div>
          <div className="fz14">
            <div
              className="mb-2"
              css={css`
                font-weight: ${metaTransactions ? 'bold' : 'normal'};
              `}
            >
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  checked={metaTransactions}
                  onChange={handleMetaTransactionsAllowed}
                />
                <FormattedMessage id={commonMessages.transactionsChange_1.id} />
              </label>
            </div>
            <div
              css={css`
                font-weight: ${!metaTransactions ? 'bold' : 'normal'};
              `}
            >
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  checked={!metaTransactions}
                  onChange={handleMetaTransactionsDisallowed}
                />
                <FormattedMessage
                  className="pr-2"
                  bold
                  id={commonMessages.transactionsChange_2.id}
                />
              </label>
            </div>
          </div>
        </div>
      </BaseStyled>
    </>
  );
};

AuthorizationData.propTypes = {
  className: PropTypes.string,
};

export default reduxForm({
  form: OLD_EMAIL_FIELD,
  onSubmitFail: (errors) => {
    console.log(errors, 'errorserrorserrorserrorserrorserrors');
    scrollToErrorField(errors);
  },
})(AuthorizationData);
