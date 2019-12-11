import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';

import { DisagreeButton } from 'containers/VoteForNewTagButton/Button';

import Button from './index';
import AlreadyVoted from './AlreadyVoted';

import { DOWNVOTE_METHOD } from './constants';

const VoteDownButton = ({ communityId }) => (
  <Button
    communityId={communityId}
    clickMethod={DOWNVOTE_METHOD}
    render={({
      isUpvoted,
      isDownvoted,
      onClick,
      upvotesNumber,
      downvotesNumber,
      id,
      disabled,
    }) =>
      !isUpvoted && !isDownvoted ? (
        <DisagreeButton onClick={onClick} id={id} disabled={disabled}>
          <FormattedMessage {...commonMessages.disagreeShort} />
        </DisagreeButton>
      ) : (
        <AlreadyVoted
          className="flex-column"
          onClick={onClick}
          choice={isDownvoted}
          id={id}
          disabled={disabled}
        >
          <p className="pb-1">
            <FormattedMessage {...commonMessages.disagreeShort} />
          </p>
          <p>{`${downvotesNumber}/${downvotesNumber + upvotesNumber}`}</p>
        </AlreadyVoted>
      )
    }
  />
);

VoteDownButton.propTypes = {
  id: PropTypes.string,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(VoteDownButton);
