import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';

import OutlinedButton from 'components/Button/Outlined/InfoStretching';
import AlreadyVoted from 'containers/VoteForNewCommunityButton/AlreadyVoted';

import Button from './index';

import { UPVOTE_METHOD } from './constants';

const VoteUpButton = /* istanbul ignore next */ ({
  id,
  communityId,
  className,
  tagId,
}) => (
  <Button
    communityId={communityId}
    tagId={tagId}
    buttonId={id}
    clickMethod={UPVOTE_METHOD}
    render={({
      isUpvoted,
      isDownvoted,
      onClick,
      upvotesNumber,
      downvotesNumber,
    }) =>
      !isUpvoted && !isDownvoted ? (
        <OutlinedButton className={className} onClick={onClick} id={id}>
          <FormattedMessage {...commonMessages.agree} />
        </OutlinedButton>
      ) : (
        <AlreadyVoted
          onClick={onClick}
          className={`flex-column ${className}`}
          choice={isUpvoted}
        >
          <p className="pb-1">
            <FormattedMessage {...commonMessages.agree} />
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
  tagId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(VoteUpButton);
