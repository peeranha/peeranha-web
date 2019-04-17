import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';
import { gray } from 'style-constants';

import OutlinedButton from 'components/Button/Outlined/InfoStretching';

import Button from './index';
import AlreadyVoted from './AlreadyVoted';

import { DOWNVOTE_METHOD } from './constants';

const OutlinedButtonStyled = OutlinedButton.extend`
  border-color: ${gray};
  color: ${gray};
`;

const VoteDownButton = /* istanbul ignore next */ ({ id, communityId }) => (
  <Button
    communityId={communityId}
    id={id}
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
          <FormattedMessage {...commonMessages.disagree} />
        </OutlinedButtonStyled>
      ) : (
        <AlreadyVoted
          className="flex-column"
          onClick={onClick}
          choice={isDownvoted}
        >
          <p className="pb-1">
            <FormattedMessage {...commonMessages.disagree} />
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
