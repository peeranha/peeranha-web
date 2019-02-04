import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';

import Base from 'components/Base';
import Span from 'components/Span';
import MyProfileButton from 'components/UserNavigation/MyProfileButton';

import {
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
  LOCATION_FIELD,
} from 'containers/Profile/constants';

import messages from 'containers/Profile/messages';
import commonMessages from 'common-messages';

const Blank = ({ profile, userId, account }) =>
  !profile[LOCATION_FIELD] &&
  !profile[COMPANY_FIELD] &&
  !profile[POSITION_FIELD] &&
  !profile[ABOUT_FIELD] && (
    <Span color="gray">
      <FormattedMessage {...messages.informationIsBlank} />
      <MyProfileButton
        userId={userId}
        account={account}
        href={routes.profile_edit(userId)}
        isLink
      >
        <Span color="blue">
          <FormattedMessage {...commonMessages.edit} />{' '}
          <FormattedMessage {...messages.profile} />
        </Span>
      </MyProfileButton>
    </Span>
  );

const Row = ({ nameField, value }) =>
  value ? (
    <div className="row align-items-center pb-2">
      <div className="col-2">
        <Span color="gray" fontSize="14">
          <FormattedMessage {...messages[nameField]} />
        </Span>
      </div>
      <div className="col-10">
        <Span>{value}</Span>
      </div>
    </div>
  ) : null;

const AdditionalUserInformation = ({ profile, userId, account }) => (
  <Base position="bottom">
    <Row nameField="locationLabel" value={profile.profile[LOCATION_FIELD]} />
    <Row nameField="companyLabel" value={profile.profile[COMPANY_FIELD]} />
    <Row nameField="positionLabel" value={profile.profile[POSITION_FIELD]} />
    <Row nameField="aboutLabel" value={profile.profile[ABOUT_FIELD]} />
    <Blank profile={profile.profile} userId={userId} account={account} />
  </Base>
);

AdditionalUserInformation.propTypes = {
  profile: PropTypes.object,
  userId: PropTypes.string,
  account: PropTypes.string,
};

Row.propTypes = {
  nameField: PropTypes.string,
  value: PropTypes.string,
};

export default React.memo(AdditionalUserInformation);
