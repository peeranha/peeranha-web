import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as routes from 'routes-config';

import Tags from 'components/TagsList';
import FollowCommunityButton from 'containers/FollowCommunityButton';

import messages from './messages';

const CommunitiesView = ({ communities }) => (
  <div>
    {_.orderBy(communities, y => y.popularity, ['desc']).map(x => (
      <div
        style={{ boxShadow: '0 0 2px rgba(0,0,0,0.2)' }}
        className="mb-2 p-2"
        key={x.value}
      >
        <div className="mb-1 d-flex justify-content-between align-items-center">
          <span>{x.label}</span>
          <div>
            <Link
              to={routes.communityTags(x.id)}
              href={routes.communityTags(x.id)}
            >
              <button className="btn btn-secondary">
                <FormattedMessage {...messages.tags} />
              </button>
            </Link>
            <FollowCommunityButton communityIdFilter={x.id} />
          </div>
        </div>
        <Tags communities={communities} communityId={x.value} />
      </div>
    ))}
  </div>
);

CommunitiesView.propTypes = {
  communities: PropTypes.array.isRequired,
};

export default CommunitiesView;
