import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UPVOTE_BUTTON_ID, DOWNVOTE_BUTTON_ID } from './constants';

const SuggestedTagsView = ({ tags, upVote, downVote }) => (
  <div>
    {tags.map(x => (
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
              data-tagid={x.id}
              data-creator={x.creator}
            >
              <FontAwesomeIcon
                className="chevron chevron-up"
                icon="chevron-up"
              />
            </button>
          </div>
          <div className="mb-3 text-center">{x.upvotes.length}</div>
          <div className="mb-3">
            <button
              id={`${DOWNVOTE_BUTTON_ID}_${x.id}`}
              onClick={downVote}
              data-tagid={x.id}
            >
              <FontAwesomeIcon
                className="chevron chevron-down"
                icon="chevron-down"
              />
            </button>
          </div>
        </div>
        <div className="px-2">
          <p>{x.name}</p>
          <p>{x.description}</p>
        </div>
      </div>
    ))}
  </div>
);

SuggestedTagsView.propTypes = {
  tags: PropTypes.array.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default SuggestedTagsView;
