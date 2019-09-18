import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import { TEXT_DARK, TEXT_PRIMARY } from 'style-constants';
import commonMessages from 'common-messages';

import Cookies from 'utils/cookies';

import H3 from 'components/H3';
import Base from 'components/Base/BaseRounded';
import InfoLabel from 'components/InfoLabelWithPopover';
import InfoButton from 'components/Button/Outlined/InfoLarge';

import profileMessages from 'containers/Profile/messages';
import signupMessages from 'containers/SignUp/messages';
import forgotPasswordMessages from 'containers/ForgotPassword/messages';
import deleteAccountMessages from 'containers/DeleteAccount/messages';

import ShowActiveKeyButton from 'containers/ShowActiveKey';
import ShowOwnerKeyButton from 'containers/ShowOwnerKey';
import ChangePasswordButton from 'containers/ChangePasswordByPrevious';
import ChangeEmailButton from 'containers/ChangeEmail';
import DeleteAccountButton from 'containers/DeleteAccount';

import { STORED_EMAIL } from 'containers/Login/constants';

const BaseStyled = Base.extend`
  > :not(:nth-child(1)) {
    margin: 30px;
  }

  table {
    width: 100%;

    tr td {
      :not(:last-child) {
        padding-right: 50px;
      }

      padding-bottom: 20px;

      :nth-child(1) {
        color: ${TEXT_DARK};
        font-weight: bold;
      }

      :nth-child(3) {
        color: ${TEXT_PRIMARY};
      }
    }
  }

  @media only screen and (max-width: 576px) {
    > :not(:nth-child(1)) {
      margin: 20px 0;
    }

    table * {
      text-align: left;
      font-size: 14px !important;
      line-height: 14px !important;
    }

    table {
      tr td:not(:last-child) {
        padding-right: 20px;
      }
    }
  }
`;

const SettingsOfUser = ({ className, locale, activeKey, ownerKey }) => (
  <BaseStyled className={className} position="bottom">
    <H3>
      <FormattedMessage {...profileMessages.authorizationData} />
    </H3>

    <table>
      <tr>
        <td>
          <FormattedMessage {...signupMessages.email} />
        </td>
        <td>{Cookies.get(STORED_EMAIL)}</td>
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
          <ShowActiveKeyButton>
            <FormattedMessage {...commonMessages.show} />
          </ShowActiveKeyButton>
        </td>
      </tr>

      <tr>
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
          <ShowOwnerKeyButton>
            <FormattedMessage {...commonMessages.show} />
          </ShowOwnerKeyButton>
        </td>
      </tr>
    </table>

    <div>
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

SettingsOfUser.propTypes = {
  className: PropTypes.string,
  locale: PropTypes.string,
  ownerKey: PropTypes.string,
  activeKey: PropTypes.string,
};

export default React.memo(SettingsOfUser);
