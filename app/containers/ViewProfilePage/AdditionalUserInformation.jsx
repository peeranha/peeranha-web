/* eslint indent: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import { TEXT_PRIMARY, TEXT_SECONDARY } from 'style-constants';

import Span from 'components/Span';
import A from 'components/A';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import {
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
  LOCATION_FIELD,
} from 'containers/Profile/constants';

import messages from 'containers/Profile/messages';

import { Box } from './MainUserInformation';

const Blank = ({ profile, userId, account }) =>
  !profile[LOCATION_FIELD] &&
  !profile[COMPANY_FIELD] &&
  !profile[POSITION_FIELD] &&
  !profile[ABOUT_FIELD] && (
    <p>
      <Span color={TEXT_SECONDARY} mobileFS="14">
        <FormattedMessage {...messages.informationIsBlank} />
      </Span>
      {userId === account && (
        <A className="ml-2" to={routes.profileEdit(userId)}>
          <Span color={TEXT_PRIMARY} mobileFS="14">
            <FormattedMessage {...messages.editProfile} />
          </Span>
        </A>
      )}
    </p>
  );

const Row = ({ nameField, value }) =>
  value ? (
    <div className="d-flex align-items-start mb-2">
      <Span color={TEXT_SECONDARY} fontSize="14" lineHeight="24">
        <FormattedMessage {...messages[nameField]} />
      </Span>
      <Span mobileFS="16" lineHeight="24" mobileLH="20">
        {value}
      </Span>
    </div>
  ) : null;

const AdditionalUserInformation = ({ profile, userId, account }) => (
  <Box position="bottom">
    {(!profile || !profile.profile) && <LoadingIndicator inline />}

    {profile &&
      profile.profile && (
        <React.Fragment>
          <Row
            nameField="locationLabel"
            value={profile.profile[LOCATION_FIELD]}
          />
          <Row
            nameField="companyLabel"
            value={profile.profile[COMPANY_FIELD]}
          />
          <Row
            nameField="positionLabel"
            value={profile.profile[POSITION_FIELD]}
          />
          <Row nameField="aboutLabel" value={profile.profile[ABOUT_FIELD]} />
          <Blank profile={profile.profile} userId={userId} account={account} />
        </React.Fragment>
      )}
  </Box>
);

AdditionalUserInformation.propTypes = {
  profile: PropTypes.object,
  userId: PropTypes.string,
  account: PropTypes.string,
};

Row.propTypes = {
  nameField: PropTypes.string,
  value: PropTypes.string,
  isColumn: PropTypes.bool,
};

export default React.memo(AdditionalUserInformation);
