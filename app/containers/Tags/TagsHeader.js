import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routes from 'routes-config';
import { FormattedMessage } from 'react-intl';

import { GO_TO_CREATE_TAG_SCREEN_BUTTON_ID } from './constants';
import messages from './messages';

const TagsHeader = ({ goToCreateTagScreen, communityid }) => (
  <div className="d-flex justify-content-end pb-3">
    <Link
      to={routes.suggestedTags(communityid)}
      href={routes.suggestedTags(communityid)}
    >
      <button className="btn btn-secondary ml-2">
        <FormattedMessage {...messages.suggestedTags} />
      </button>
    </Link>

    <button
      className="btn btn-secondary ml-2"
      onClick={goToCreateTagScreen}
      id={GO_TO_CREATE_TAG_SCREEN_BUTTON_ID}
    >
      <FormattedMessage {...messages.createTag} />
    </button>
  </div>
);

TagsHeader.propTypes = {
  goToCreateTagScreen: PropTypes.func.isRequired,
  communityid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TagsHeader;
