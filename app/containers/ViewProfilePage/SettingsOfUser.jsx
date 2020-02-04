import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import * as clipboard from 'clipboard-polyfill';

import { TEXT_DARK, TEXT_PRIMARY } from 'style-constants';
import commonMessages from 'common-messages';

import { showPopover } from 'utils/popover';

import H3 from 'components/H3';
import Base from 'components/Base/BaseRounded';
import InfoLabel from 'components/InfoLabelWithPopover';
import InfoButton from 'components/Button/Outlined/InfoMedium';

import profileMessages from 'containers/Profile/messages';
import signupMessages from 'containers/SignUp/messages';
import forgotPasswordMessages from 'containers/ForgotPassword/messages';
import deleteAccountMessages from 'containers/DeleteAccount/messages';

import ShowActiveKeyButton from 'containers/ShowActiveKey';
import ShowOwnerKeyButton from 'containers/ShowOwnerKey';
import ChangePasswordButton from 'containers/ChangePasswordByPrevious';
import ChangeEmailButton from 'containers/ChangeEmail';
import DeleteAccountButton from 'containers/DeleteAccount';
import ReferralProgram from './ReferralProgram';
import NotFound from '../ErrorPage';

export const BaseStyled = Base.extend`
  > :nth-child(2) {
    margin: 30px 0;
    padding: 0 30px;
  }

  table {
    width: 100%;

    tr td {
      :nth-child(1) {
        color: ${TEXT_DARK};
        font-weight: bold;
        padding: 0 0 20px 0;
        white-space: nowrap;
      }

      :nth-child(2) {
        padding: 0 0 20px 0;
      }

      :nth-child(3) {
        color: ${TEXT_PRIMARY};
        padding: 0 0 20px 0;
        text-align: right;
        white-space: nowrap;
      }
    }
  }

  table#referral {
    tr td {
      button {
      }
      :nth-child(2) {
        color: ${TEXT_PRIMARY};
        padding: 0;
        text-align: right;
        white-space: nowrap;
      }
    }
  }

  #link {
    display: flex;
    flex-direction: column;
  }

  td a,
  #code {
    margin-top: 5px;
    color: ${TEXT_PRIMARY};
    font-weight: normal;
  }

  h3 {
    margin-bottom: 14px;
  }

  @media only screen and (max-width: 576px) {
    > :nth-child(2) {
      margin: 20px 0;
      padding: 0;
    }

    table * {
      text-align: left;
      font-size: 14px !important;
      line-height: 14px !important;
    }

    table {
      tr {
        display: flex;
        flex-direction: column;
      }

      tr td {
        padding: 0 30px 20px 0px !important;
        text-align: left !important;
      }
    }
  }
`;

const SettingsOfUser = ({
  className,
  locale,
  activeKey,
  ownerKey,
  loginData,
  user,
  isAvailable,
}) => {
  const writeToBuffer = event => {
    clipboard.writeText(event.currentTarget.dataset.key);
    showPopover(
      event.currentTarget.id,
      translationMessages[locale][commonMessages.copied.id],
    );
  };

  return isAvailable ? (
    <div>
      <BaseStyled
        className={`${className}${loginData.loginWithScatter ? ' d-none' : ''}`}
        position="bottom"
      >
        <H3>
          <FormattedMessage {...profileMessages.authorizationData} />
        </H3>

        <div>
          <table>
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
              className={
                !loginData || !loginData.hasOwnerEosKey ? 'd-none' : ''
              }
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

      <ReferralProgram
        className={className}
        user={user}
        writeToBuffer={writeToBuffer}
      />
    </div>
  ) : (
    <div className={className}>
      <NotFound withSeo={false} />
    </div>
  );
};

SettingsOfUser.propTypes = {
  className: PropTypes.string,
  locale: PropTypes.string,
  ownerKey: PropTypes.string,
  activeKey: PropTypes.string,
  loginData: PropTypes.object,
  user: PropTypes.string,
  isAvailable: PropTypes.string,
};

export default React.memo(SettingsOfUser);
