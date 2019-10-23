import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';
import { TEXT_PRIMARY, TEXT_SECONDARY } from 'style-constants';

import Base from 'components/Base';
import Span from 'components/Span';
import A from 'components/A';

import {
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
  LOCATION_FIELD,
} from 'containers/Profile/constants';

import messages from 'containers/Profile/messages';

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

const Row = ({ nameField, value, isColumn }) =>
  value ? (
    <div className="row align-items-center word-break-all pb-1">
      <div className={isColumn ? 'col-12' : 'col-4 col-sm-2'}>
        <Span color={TEXT_SECONDARY} fontSize="14">
          <FormattedMessage {...messages[nameField]} />
        </Span>
      </div>
      <div className={isColumn ? 'col-12' : 'col-8 col-sm-10'}>
        <Span mobileFS="14">{value}</Span>
      </div>
    </div>
  ) : null;

const AdditionalUserInformation = ({ profile, userId, account }) => (
  <Base position="bottom">
    <Row nameField="locationLabel" value={profile.profile[LOCATION_FIELD]} />
    <Row nameField="companyLabel" value={profile.profile[COMPANY_FIELD]} />
    <Row nameField="positionLabel" value={profile.profile[POSITION_FIELD]} />
    <Row isColumn nameField="aboutLabel" value={profile.profile[ABOUT_FIELD]} />
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
  isColumn: PropTypes.bool,
};

export default React.memo(AdditionalUserInformation);
