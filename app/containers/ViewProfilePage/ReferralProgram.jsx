import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import * as routes from 'routes-config';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import H3 from 'components/H3';

import profileMessages from '../Profile/messages';
import { BaseStyled } from './SettingsOfUser';

const single = isSingleCommunityWebsite();

const ReferralProgram = ({ className, user, writeToBuffer }) => {
  const referralLink = `${
    single ? window.location.origin : process.env.APP_LOCATION
  }${routes.referralPage(user)}`;

  return (
    <>
      <BaseStyled className={className} style={{ marginTop: '10px' }}>
        <div>
          <H3>
            <FormattedMessage {...profileMessages.referralProgram} />
          </H3>
          <FormattedMessage {...profileMessages.referralText} />
        </div>
        <div>
          <table id="referral">
            <thead>
              <tr>
                <td id="link">
                  <FormattedMessage {...profileMessages.referralLink} />
                  <Link to={routes.referralPage(user)}>{referralLink}</Link>
                </td>
                <td>
                  <button
                    id="referral-link-copy"
                    data-key={referralLink}
                    onClick={writeToBuffer}
                    className={'link-btn'}
                  >
                    <FormattedMessage {...commonMessages.copy} />{' '}
                  </button>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <FormattedMessage {...profileMessages.referralCode} />
                  <p id="code">{user}</p>
                </td>
                <td>
                  <button
                    id="referral-code-copy"
                    data-key={user}
                    onClick={writeToBuffer}
                    className={'link-btn'}
                  >
                    <FormattedMessage {...commonMessages.copy} />{' '}
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
