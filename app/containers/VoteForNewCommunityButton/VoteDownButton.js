import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';
import { gray } from 'style-constants';

import Dropdown from 'components/Dropdown';
import OutlinedButton from 'components/Button/OutlinedButton';

import Button from './index';
import Warning from './Warning';
import AlreadyVoted from './AlreadyVoted';

import { DOWNVOTE_METHOD } from './constants';

const OutlinedButtonStyled = OutlinedButton.extend`
  border-color: ${gray};
  color: ${gray};
`.withComponent('span');

const D = ({ communityId, onClick, id }) => (
  <Dropdown
    id={`downvote_comm_id_${communityId}`}
    button={
      <OutlinedButtonStyled id={id} className="px-1">
        <FormattedMessage {...commonMessages.disagree} />
      </OutlinedButtonStyled>
    }
    menu={<Warning onClick={onClick} />}
  />
);

const VoteDownButton = ({ id, communityId }) => (
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
        <D communityId={communityId} onClick={onClick} />
      ) : (
        <AlreadyVoted choice={isDownvoted}>
          <p>
            <FormattedMessage {...commonMessages.disagree} />
          </p>
          <p>{`${downvotesNumber}/${downvotesNumber + upvotesNumber}`}</p>
        </AlreadyVoted>
      )
    }
  />
);

D.propTypes = {
  communityId: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
};

VoteDownButton.propTypes = {
  id: PropTypes.string,
  communityId: PropTypes.string,
};

export default React.memo(VoteDownButton);
