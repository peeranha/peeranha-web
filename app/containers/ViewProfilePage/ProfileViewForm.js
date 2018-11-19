import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  DISPLAY_NAME_FIELD,
  POSITION_FIELD,
  COMPANY_FIELD,
  ABOUT_FIELD,
  LOCATION_FIELD,
} from 'containers/Profile/constants';

import * as routes from 'routes-config';

import messages from 'containers/Profile/messages';
import ViewFormListItem from './ViewFormListItem';

const ProfileViewForm = props => {
  const { profile } = props.profile;
  const editUrl = routes.profile_edit(props.match.params.id);
  const isOwner = props.account === props.match.params.id;

  return (
    <div className="view-form">
      {props.profile.ipfs_avatar && (
        <div className="d-flex justify-content-center">
          <img
            className="profile-image"
            src={props.profile.ipfs_avatar}
            alt=""
          />
        </div>
      )}
      <ViewFormListItem
        label={messages.displayNameLabel}
        message={profile && profile[DISPLAY_NAME_FIELD]}
      />
      <ViewFormListItem
        label={messages.positionLabel}
        message={profile && profile[POSITION_FIELD]}
      />
      <ViewFormListItem
        label={messages.companyLabel}
        message={profile && profile[COMPANY_FIELD]}
      />
      <ViewFormListItem
        label={messages.aboutLabel}
        message={profile && profile[ABOUT_FIELD]}
      />
      <ViewFormListItem
        label={messages.locationLabel}
        message={
          profile && profile[LOCATION_FIELD] && profile[LOCATION_FIELD].name
        }
      />
      {isOwner && (
        <Link to={editUrl} href={editUrl}>
          <button className="btn btn-success form-control">
            <FormattedMessage {...messages.editButton} />
          </button>
        </Link>
      )}
    </div>
  );
};

ProfileViewForm.propTypes = {
  profile: PropTypes.object,
  match: PropTypes.object,
  account: PropTypes.string,
};

export default ProfileViewForm;
