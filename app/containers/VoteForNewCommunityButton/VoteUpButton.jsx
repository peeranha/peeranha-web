import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';

import AgreeButton from 'containers/VoteForNewTagButton/Button';

import Button from './index';
import AlreadyVoted from './AlreadyVoted';

import { UPVOTE_METHOD } from './constants';

const VoteUpButton = ({ communityId, className }) => (
  <Button
    communityId={communityId}
    clickMethod={UPVOTE_METHOD}
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
        <AgreeButton
          className={className}
          onClick={onClick}
          id={id}
          disabled={disabled}
        >
          <FormattedMessage {...commonMessages.agreeShort} />
        </AgreeButton>
      ) : (
        <AlreadyVoted
          onClick={onClick}
          className={`flex-column ${className}`}
          choice={isUpvoted}
          id={id}
          disabled={disabled}
        >
          <p className="pb-1">
            <FormattedMessage {...commonMessages.agreeShort} />
          </p>
          <p>{`${upvotesNumber}/${downvotesNumber + upvotesNumber}`}</p>
        </AlreadyVoted>
      )
    }
  />
);

VoteUpButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(VoteUpButton);
