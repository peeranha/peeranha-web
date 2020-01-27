import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import H3 from 'components/H3';
import commonMessages from 'common-messages';
import * as routes from 'routes-config';
import { FormattedMessage } from 'react-intl';

import profileMessages from '../Profile/messages';
import { BaseStyled } from './SettingsOfUser';

const ReferralProgram = ({ className, user, writeToBuffer }) => {
  const referralLink = `https://peeranha.io/users/${user}`;
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
            <tr>
              <td id="link">
                <FormattedMessage {...profileMessages.referralLink} />
                <Link to={routes.profileView(user)}>{referralLink}</Link>
              </td>
              <td>
                <button
                  id="referral-link-copy"
                  data-key={referralLink}
                  onClick={writeToBuffer}
                >
                  <FormattedMessage {...commonMessages.copy} />{' '}
                </button>
              </td>
            </tr>

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
                >
                  <FormattedMessage {...commonMessages.copy} />{' '}
                </button>
              </td>
            </tr>
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
