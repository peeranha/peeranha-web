import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';
import { BORDER_SECONDARY, TEXT_SECONDARY } from 'style-constants';

import OutlinedButton from 'components/Button/Outlined/InfoStretching';
import AlreadyVoted from 'containers/VoteForNewCommunityButton/AlreadyVoted';

import Button from './index';

import { DOWNVOTE_METHOD } from './constants';

const OutlinedButtonStyled = OutlinedButton.extend`
  border-color: ${BORDER_SECONDARY};
  color: ${TEXT_SECONDARY};
`;

const VoteDownButton = /* istanbul ignore next */ ({
  id,
  communityId,
  tagId,
}) => (
  <Button
    communityId={communityId}
    tagId={tagId}
    buttonId={id}
    clickMethod={DOWNVOTE_METHOD}
    render={({
      isUpvoted,
      isDownvoted,
      onClick,
      upvotesNumber,
      downvotesNumber,
    }) =>
      !isUpvoted && !isDownvoted ? (
        <OutlinedButtonStyled onClick={onClick} id={id}>
          <FormattedMessage {...commonMessages.disagreeShort} />
        </OutlinedButtonStyled>
      ) : (
        <AlreadyVoted
          className="flex-column"
          onClick={onClick}
          choice={isDownvoted}
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
  tagId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(VoteDownButton);
