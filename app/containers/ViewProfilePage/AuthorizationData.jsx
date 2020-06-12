import React from 'react';
import PropTypes from 'prop-types';

import { translationMessages } from 'i18n';
import { FormattedMessage } from 'react-intl';

import H3 from 'components/H3';
import InfoLabel from 'components/InfoLabelWithPopover';
import InfoButton from 'components/Button/Outlined/InfoMedium';

import commonMessages from 'common-messages';
import signupMessages from '../SignUp/messages';
import profileMessages from '../Profile/messages';
import deleteAccountMessages from '../DeleteAccount/messages';
import forgotPasswordMessages from '../ForgotPassword/messages';

import { BaseStyled } from './SettingsOfUser';
import ChangeEmailButton from '../ChangeEmail';
import ShowOwnerKeyButton from '../ShowOwnerKey';
import ShowActiveKeyButton from '../ShowActiveKey';
import DeleteAccountButton from '../DeleteAccount';
import ChangePasswordButton from '../ChangePasswordByPrevious';

const AuthorizationData = ({
  locale,
  ownerKey,
  loginData,
  className,
  activeKey,
  writeToBuffer,
}) => (
  <BaseStyled
    position="bottom"
    notRoundedStyle
    className={`${className}${loginData.loginWithScatter ? ' d-none' : ''}`}
  >
    <H3>
      <FormattedMessage {...profileMessages.authorizationData} />
    </H3>

    <div>
      <table>
        <thead>
          <tr>
            <td>
              <FormattedMessage {...signupMessages.email} />
            </td>
            <td>{loginData ? loginData.email : null}</td>
            <td>
              <ChangeEmailButton>
                <FormattedMessage {...commonMessages.change} />{' '}
              </ChangeEmailButton>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <FormattedMessage {...signupMessages.password} />
            </td>
            <td>• • • • • • • • • • • • •</td>
            <td>
              <ChangePasswordButton>
                <FormattedMessage {...commonMessages.change} />{' '}
              </ChangePasswordButton>
            </td>
          </tr>

          <tr>
            <td>
              <InfoLabel
                id="wallet_settings_eos_active"
                message={
                  translationMessages[locale][
                    forgotPasswordMessages.youGotThisKey.id
                  ]
                }
              >
                <FormattedMessage {...signupMessages.eosActivePrivateKey} />
              </InfoLabel>
            </td>
            <td>{activeKey || `• • • • • • • • • •`}</td>

            <td>
              <button
                id="viewprofile-settings-activekey"
                className={!activeKey ? 'd-none' : 'mr-3'}
                data-key={activeKey}
                onClick={writeToBuffer}
              >
                <FormattedMessage {...commonMessages.copy} />
              </button>

              <ShowActiveKeyButton activeKey={activeKey}>
                <FormattedMessage
                  {...commonMessages[!activeKey ? 'show' : 'hide']}
                />
              </ShowActiveKeyButton>
            </td>
          </tr>

          <tr
            className={!loginData || !loginData.hasOwnerEosKey ? 'd-none' : ''}
          >
            <td>
              <InfoLabel
                id="wallet_settings_eos_owner"
                message={
                  translationMessages[locale][
                    forgotPasswordMessages.youGotThisKey.id
                  ]
                }
              >
                <FormattedMessage {...signupMessages.eosOwnerPrivateKey} />
              </InfoLabel>
            </td>
            <td>{ownerKey || `• • • • • • • • • •`}</td>
            <td>
              <button
                id="viewprofile-settings-ownerkey"
                className={!ownerKey ? 'd-none' : 'mr-3'}
                data-key={ownerKey}
                onClick={writeToBuffer}
              >
                <FormattedMessage {...commonMessages.copy} />
              </button>

              <ShowOwnerKeyButton ownerKey={ownerKey}>
                <FormattedMessage
                  {...commonMessages[!ownerKey ? 'show' : 'hide']}
                />
              </ShowOwnerKeyButton>
            </td>
          </tr>
        </tbody>
      </table>

      <DeleteAccountButton
        render={({ onClick }) => (
          <InfoButton onClick={onClick}>
            <FormattedMessage {...deleteAccountMessages.deleteAccount} />
          </InfoButton>
        )}
      />
    </div>
  </BaseStyled>
);

AuthorizationData.propTypes = {
  className: PropTypes.string,
  locale: PropTypes.string,
  ownerKey: PropTypes.string,
  activeKey: PropTypes.string,
  loginData: PropTypes.object,
  isAvailable: PropTypes.bool,
  writeToBuffer: PropTypes.func,
};

export default AuthorizationData;
