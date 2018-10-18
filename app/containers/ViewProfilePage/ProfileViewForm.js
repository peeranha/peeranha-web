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

import messages from 'containers/Profile/messages';
import ViewFormListItem from './ViewFormListItem';

const ProfileViewForm = props => {
  const { ipfs } = props.profile;
  const editUrl = `/users/edit/${props.match.params.id}`;
  const isOwner = props.account === props.match.params.id;

  return (
    <div className="view-form">
      {props.profile.savedProfileImg && (
        <div className="d-flex justify-content-center">
          <img
            className="profile-image"
            src={props.profile.savedProfileImg}
            alt=""
          />
        </div>
      )}
      <ViewFormListItem
        label={messages.displayNameLabel}
        message={ipfs && ipfs[DISPLAY_NAME_FIELD]}
      />
      <ViewFormListItem
        label={messages.positionLabel}
        message={ipfs && ipfs[POSITION_FIELD]}
      />
      <ViewFormListItem
        label={messages.companyLabel}
        message={ipfs && ipfs[COMPANY_FIELD]}
      />
      <ViewFormListItem
        label={messages.aboutLabel}
        message={ipfs && ipfs[ABOUT_FIELD]}
      />
      <ViewFormListItem
        label={messages.locationLabel}
        message={ipfs && ipfs[LOCATION_FIELD] && ipfs[LOCATION_FIELD].name}
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
  profile: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  account: PropTypes.string.isRequired,
};

export default ProfileViewForm;
