import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import H3 from 'components/H3';
import InfoButton from 'components/Button/Outlined/InfoMedium';
import styled from 'styled-components';

import {
  CONFIRM_TG_ACCOUNT,
  UNLINK_TG_ACCOUNT,
} from '../TelegramAccountAction/constants';

import { BaseStyled } from './SettingsOfUser';
import ChangeEmailButton from '../ChangeEmail';
import DeleteAccountButton from '../DeleteAccount';
import ChangePasswordButton from '../ChangePasswordByPrevious';
import TelegramAccountAction from '../TelegramAccountAction';
import * as routes from '../../routes-config';
import A from '../../components/A';
import { svgDraw } from '../../components/Icon/IconStyled';
import { TEXT_PRIMARY } from '../../style-constants';

const Link = styled(A)`
  ${svgDraw({ color: TEXT_PRIMARY })};
`;

const AuthorizationData = ({ loginData, className, tgData, profile }) => {
  const { t } = useTranslation();
  const { loginWithFacebook, loginWithScatter, loginWithKeycat } = loginData;
  const isLoggedInWithWallet = loginWithScatter || loginWithKeycat;

  const tgAccountName =
    tgData?.temporaryAccountDisplayName ??
    profile?.profile?.temporaryAccountDisplayName;

  if (isLoggedInWithWallet && !tgData) return null;

  return (
    <BaseStyled position="bottom" notRoundedStyle className={className}>
      <H3>{t('profile.authorizationData')}</H3>

      <div>
        <table>
          {!loginWithFacebook &&
            !isLoggedInWithWallet && (
              <thead>
                <tr>
                  <td>{t('signUp.email')}</td>
                  <td>{loginData?.email ?? null}</td>
                  <td>
                    <ChangeEmailButton>{t('common.change')} </ChangeEmailButton>
                  </td>
                </tr>
              </thead>
            )}

          <tbody>
            {!loginWithFacebook &&
              !isLoggedInWithWallet && (
                <tr>
                  <td>{t('signUp.password')}</td>
                  <td>• • • • • • • • • • • • •</td>
                  <td>
                    <ChangePasswordButton>
                      {t('common.change')}{' '}
                    </ChangePasswordButton>
                  </td>
                </tr>
              )}

            {tgData && (
              <>
                <tr>
                  {(!!tgAccountName && (
                    <>
                      <td>{t('signUp.tgAccountName')}</td>
                      {(tgData.temporaryUser && (
                        <Link to={routes.profileView(tgData.temporaryUser)}>
                          {tgAccountName}
                        </Link>
                      )) || <td>{tgAccountName}</td>}
                    </>
                  )) || (
                    <>
                      <td>{t('signUp.tgAccountID')}</td>
                      <td>{tgData.telegram_id}</td>
                    </>
                  )}

                  <td>
                    {!tgData.confirmed && (
                      <TelegramAccountAction
                        actionType={CONFIRM_TG_ACCOUNT}
                        data={tgData}
                        profile={profile}
                      />
                    )}

                    <TelegramAccountAction
                      actionType={UNLINK_TG_ACCOUNT}
                      data={tgData}
                      profile={profile}
                    />
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        {!isLoggedInWithWallet && (
          <DeleteAccountButton
            render={({ onClick }) => (
              <InfoButton onClick={onClick}>
                {t('common.deleteAccount')}
              </InfoButton>
            )}
          />
        )}
      </div>
    </BaseStyled>
  );
};

AuthorizationData.propTypes = {
  className: PropTypes.string,
  locale: PropTypes.string,
  ownerKey: PropTypes.string,
  activeKey: PropTypes.string,
  loginData: PropTypes.object,
  isAvailable: PropTypes.bool,
  writeToBuffer: PropTypes.func,
  tgData: PropTypes.object,
  profile: PropTypes.object,
};

export default AuthorizationData;
