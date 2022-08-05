import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import H3 from 'components/H3';

import styled from 'styled-components';

import {
  CONFIRM_TG_ACCOUNT,
  UNLINK_TG_ACCOUNT,
} from '../TelegramAccountAction/constants';
import signupMessages from '../SignUp/messages';
import profileMessages from '../Profile/messages';

import { BaseStyled } from './SettingsOfUser';
import TelegramAccountAction from '../TelegramAccountAction';
import * as routes from '../../routes-config';
import A from '../../components/A';
import { svgDraw } from '../../components/Icon/IconStyled';
import { TEXT_PRIMARY } from '../../style-constants';

const Link = styled(A)`
  ${svgDraw({ color: TEXT_PRIMARY })};
`;

const AuthorizationData = ({ loginData, className, tgData, profile }) => {
  const { loginWithScatter, loginWithKeycat } = loginData;
  const isLoggedInWithWallet = loginWithScatter || loginWithKeycat;

  const tgAccountName =
    tgData?.temporaryAccountDisplayName ??
    profile?.profile?.temporaryAccountDisplayName;

  if (isLoggedInWithWallet && !tgData) return null;

  return (
    <BaseStyled position="bottom" notRoundedStyle className={className}>
      <H3>
        <FormattedMessage {...profileMessages.authorizationData} />
      </H3>

      <div>
        <table>
          {!isLoggedInWithWallet && (
            <thead>
              <tr>
                <td>
                  <FormattedMessage {...signupMessages.email} />
                </td>
                <td>{loginData?.email ?? null}</td>
              </tr>
            </thead>
          )}

          <tbody>
            {!isLoggedInWithWallet && (
              <tr>
                <td>
                  <FormattedMessage {...signupMessages.password} />
                </td>
              </tr>
            )}

            {tgData && (
              <>
                <tr>
                  {(!!tgAccountName && (
                    <>
                      <td>
                        <FormattedMessage {...signupMessages.tgAccountName} />
                      </td>
                      {(tgData.temporaryUser && (
                        <Link to={routes.profileView(tgData.temporaryUser)}>
                          {tgAccountName}
                        </Link>
                      )) || <td>{tgAccountName}</td>}
                    </>
                  )) || (
                    <>
                      <td>
                        <FormattedMessage {...signupMessages.tgAccountID} />
                      </td>
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
