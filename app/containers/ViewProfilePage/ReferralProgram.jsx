import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import H3 from 'components/H3';

import { BaseStyled } from './SettingsOfUser';

const single = isSingleCommunityWebsite();

const ReferralProgram = ({ className, user, writeToBuffer }) => {
  const { t } = useTranslation();
  const referralLink = `${
    single ? window.location.origin : process.env.APP_LOCATION
  }${routes.referralPage(user)}`;

  return (
    <>
      <BaseStyled className={className} style={{ marginTop: '10px' }}>
        <div>
          <H3>{t('profile.referralProgram')}</H3>
          {t('profile.referralText')}
        </div>
        <div>
          <table id="referral">
            <thead>
              <tr>
                <td id="link">
                  {t('profile.referralLink')}
                  <Link to={routes.referralPage(user)}>{referralLink}</Link>
                </td>
                <td>
                  <button
                    id="referral-link-copy"
                    data-key={referralLink}
                    onClick={writeToBuffer}
                    className={'link-btn'}
                  >
                    {t('common.copy')}{' '}
                  </button>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {t('profile.referralCode')}
                  <p id="code">{user}</p>
                </td>
                <td>
                  <button
                    id="referral-code-copy"
                    data-key={user}
                    onClick={writeToBuffer}
                    className={'link-btn'}
                  >
                    {t('common.copy')}{' '}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BaseStyled>
    </>
  );
};

ReferralProgram.propTypes = {
  className: PropTypes.string,
  user: PropTypes.string,
  writeToBuffer: PropTypes.func,
};

export default ReferralProgram;
