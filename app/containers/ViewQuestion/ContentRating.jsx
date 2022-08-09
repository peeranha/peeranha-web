/* eslint indent: 0 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import DisLikeIcon from 'icons/DisLike';
import LikeIcon from 'icons/Like';
import { getFormattedNum } from 'utils/numbers';

import Span from 'components/Span';
import Button from 'components/Button/Contained/Transparent';

import { UP_VOTE_BUTTON, DOWN_VOTE_BUTTON } from './constants';

const ImgBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  :after {
    content: '';
    position: absolute;
    top: calc(50% - 21px);
    left: calc(50% - 21px);
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
`;

const ContentRating = ({
  answerId,
  account,
  upVote,
  votingStatus,
  rating,
  downVote,
  author,
  ids,
}) => (
  <>
    <Button
      className="overflow-initial"
      onClick={upVote}
      disabled={ids.includes(`${UP_VOTE_BUTTON}${answerId}`)}
      id={`${UP_VOTE_BUTTON}${answerId}`}
      data-answerid={answerId}
      data-whowasupvoted={author.user}
    >
      <UpvoteIcon
        account={account}
        author={author}
        votingStatus={votingStatus}
      />
    </Button>

    <Span fontSize="20" bold>
      {getFormattedNum(rating)}
    </Span>

    <Button
      className="overflow-initial"
      onClick={downVote}
      disabled={ids.includes(`${DOWN_VOTE_BUTTON}${answerId}`)}
      id={`${DOWN_VOTE_BUTTON}${answerId}`}
      data-answerid={answerId}
      data-whowasdownvoted={author.user}
    >
      <DownvoteIcon
        account={account}
        author={author}
        votingStatus={votingStatus}
      />
    </Button>
  </>
);

ContentRating.propTypes = {
  rating: PropTypes.number,
  votingStatus: PropTypes.object,
  author: PropTypes.object,
  account: PropTypes.string,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  ids: PropTypes.array,
  answerId: PropTypes.number,
};

function UpvoteIcon({ account, author, votingStatus }) {
  let icon = null;
  if (account === author.user) {
    icon = <LikeIcon size={[22, 22]} fill="#BDBDBD" stroke="#BDBDBD" />;
  } else if (votingStatus?.isUpVoted) {
    icon = <LikeIcon size={[22, 22]} fill="#28A745" stroke="#28A745" />;
  } else if (votingStatus?.isDownVoted) {
    icon = <LikeIcon size={[22, 22]} fill="none" stroke="#BDBDBD" />;
  } else {
    icon = <LikeIcon size={[22, 22]} fill="#7699FF" stroke="#576FED" />;
  }

  return <ImgBox>{icon}</ImgBox>;
}

UpvoteIcon.propTypes = {
  votingStatus: PropTypes.object,
  author: PropTypes.object,
  account: PropTypes.string,
};

function DownvoteIcon({ account, author, votingStatus }) {
  let icon = null;

  if (account === author.user) {
    icon = <DisLikeIcon size={[22, 22]} fill="#BDBDBD" stroke="#BDBDBD" />;
  } else if (votingStatus?.isDownVoted) {
    icon = <DisLikeIcon size={[22, 22]} fill="#F76F60" stroke="#F76F60" />;
  } else if (votingStatus?.isUpVoted) {
    icon = <DisLikeIcon size={[22, 22]} fill="none" stroke="#BDBDBD" />;
  } else {
    icon = <DisLikeIcon size={[22, 22]} fill="#7699FF" stroke="#576FED" />;
  }

  return <ImgBox>{icon}</ImgBox>;
}

DownvoteIcon.propTypes = {
  votingStatus: PropTypes.object,
  author: PropTypes.object,
  account: PropTypes.string,
};

export { UpvoteIcon, DownvoteIcon, ContentRating };
export default React.memo(ContentRating);
