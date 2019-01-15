import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UPVOTE_BUTTON_ID, DOWNVOTE_BUTTON_ID } from './constants';

const SuggestedCommunitiesView = ({ communities, upVote, downVote }) => (
  <div>
    {communities.map(x => (
      <div
        key={x.id}
        className="d-flex p-3 my-3"
        style={{ boxShadow: '0 0 1px rgba(0,0,0,0.2)' }}
      >
        <div className="mx-2">
          <div className="mb-3">
            <button
              id={`${UPVOTE_BUTTON_ID}_${x.id}`}
              onClick={upVote}
              data-communityid={x.id}
              data-creator={x.creator}
            >
              <FontAwesomeIcon
                className="chevron chevron-up"
                icon="chevron-up"
              />
            </button>
          </div>
          <div className="mb-3 text-center">{x.votes}</div>
          <div className="mb-3">
            <button
              id={`${DOWNVOTE_BUTTON_ID}_${x.id}`}
              onClick={downVote}
              data-communityid={x.id}
            >
              <FontAwesomeIcon
                className="chevron chevron-down"
                icon="chevron-down"
              />
            </button>
          </div>
        </div>
        <div>
          <img width="100px" src={x.avatar} alt="com_avtr" />
        </div>
        <div className="px-2">
          <p>{x.name}</p>
          <p>{x.description}</p>
        </div>
      </div>
    ))}
  </div>
);

SuggestedCommunitiesView.propTypes = {
  communities: PropTypes.array.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default SuggestedCommunitiesView;
