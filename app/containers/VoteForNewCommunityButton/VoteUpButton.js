import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';

import Dropdown from 'components/Dropdown';
import OutlinedButton from 'components/Button/OutlinedButton';

import Button from './index';
import Warning from './Warning';
import AlreadyVoted from './AlreadyVoted';

import { UPVOTE_METHOD } from './constants';

const B = OutlinedButton.extend`
  position: relative;
`.withComponent('span');

const D = ({ communityId, onClick, id }) => (
  <Dropdown
    id={`vote_comm_id_${communityId}`}
    button={
      <B id={id} className="px-1">
        <FormattedMessage {...commonMessages.agree} />
      </B>
    }
    menu={<Warning onClick={onClick} />}
  />
);

const VoteUpButton = ({ id, communityId }) => (
  <Button
    communityId={communityId}
    id={id}
    clickMethod={UPVOTE_METHOD}
    render={({
      isUpvoted,
      isDownvoted,
      onClick,
      upvotesNumber,
      downvotesNumber,
    }) =>
      !isUpvoted && !isDownvoted ? (
        <D id={id} communityId={communityId} onClick={onClick} />
      ) : (
        <AlreadyVoted choice={isUpvoted}>
          <p>
            <FormattedMessage {...commonMessages.agree} />
          </p>
          <p>{`${upvotesNumber}/${downvotesNumber + upvotesNumber}`}</p>
        </AlreadyVoted>
      )
    }
  />
);

D.propTypes = {
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  onClick: PropTypes.func,
};

VoteUpButton.propTypes = {
  id: PropTypes.string,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(VoteUpButton);
