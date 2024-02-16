/* eslint indent: 0 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import fingerUpSingleQuestionPage from 'images/fingerUpSingleQuestionPage.svg?external';
import greenFingerUpSingleQuestion from 'images/greenFingerUpSingleQuestion.svg?external';
import fingerDownSingleQuestionPage from 'images/fingerDownSingleQuestionPage.svg?external';
import redFingerDownSingleQuestion from 'images/redFingerDownSingleQuestion.svg?external';
import disabledFingerUp from 'images/disabledFingerUp.svg?external';
import disabledFingerDown from 'images/disabledFingerDown.svg?external';
import emptyFingerUp from 'images/emptyFingerUp.svg?external';
import emptyFingerDown from 'images/emptyFingerDown.svg?external';

import { BORDER_SUCCESS, BORDER_ATTENTION_LIGHT, BORDER_PRIMARY_LIGHT } from 'style-constants';
import { getFormattedNum } from 'utils/numbers';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

import Span from 'components/Span';
import Button from 'components/Button/Contained/Transparent';
import { IconLg } from 'components/Icon/IconWithSizes';
import {
  UpvoteCanceledGraph,
  DownvoteCanceledGraph,
  ThumbsUpGraph,
  ThumbsDownGraph,
} from 'components/icons';

import { UP_VOTE_BUTTON, DOWN_VOTE_BUTTON } from './constants';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const ImgBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .stroke {
    stroke: ${colors.votingIconColor};
  }

  :after {
    content: '';
    position: absolute;
    top: calc(50% - 21px);
    left: calc(50% - 21px);
    width: 42px;
    height: 42px;
    border-radius: 50%;

    ${(x) => (x.src === greenFingerUpSingleQuestion ? `border: 1px solid ${BORDER_SUCCESS};` : ``)};

    ${(x) =>
      x.src === redFingerDownSingleQuestion ? `border: 1px solid ${BORDER_ATTENTION_LIGHT};` : ``};
  }

  @media only screen and (max-width: 576px) {
    ${(x) =>
      x.src === greenFingerUpSingleQuestion || x.src === redFingerDownSingleQuestion
        ? `width: 42px; height: 42px;`
        : ``};
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
      css={graphCommunity && { color: 'unset' }}
    >
      <UpvoteIcon account={account} author={author} votingStatus={votingStatus} />
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
      css={graphCommunity && { color: 'unset' }}
    >
      <DownvoteIcon account={account} author={author} votingStatus={votingStatus} />
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
  profile: PropTypes.object,
  loginWithSuiDispatch: PropTypes.func,
};

function UpvoteIcon({ account, author, votingStatus }) {
  let src = null;
  let graphIcon;
  if (account === author.user) {
    src = disabledFingerUp;
    graphIcon = <UpvoteCanceledGraph size={[24, 24]} />;
  } else if (votingStatus?.isUpVoted) {
    src = greenFingerUpSingleQuestion;
    graphIcon = <ThumbsUpGraph fill="#4BCA81" size={[24, 24]} />;
  } else if (votingStatus?.isDownVoted) {
    src = emptyFingerUp;
    graphIcon = <ThumbsUpGraph size={[24, 24]} />;
  } else {
    src = fingerUpSingleQuestionPage;
    graphIcon = <ThumbsUpGraph size={[24, 24]} />;
  }

  return (
    <ImgBox src={src}>
      {graphCommunity ? graphIcon : <IconLg icon={src} fill={BORDER_PRIMARY_LIGHT} />}
    </ImgBox>
  );
}

UpvoteIcon.propTypes = {
  votingStatus: PropTypes.object,
  author: PropTypes.object,
  account: PropTypes.string,
};

function DownvoteIcon({ account, author, votingStatus }) {
  let src = null;
  let graphIcon;
  if (account === author.user) {
    src = disabledFingerDown;
    graphIcon = <DownvoteCanceledGraph size={[24, 24]} />;
  } else if (votingStatus?.isDownVoted) {
    src = redFingerDownSingleQuestion;
    graphIcon = <ThumbsDownGraph fill="#ED4A6D" size={[24, 24]} />;
  } else if (votingStatus?.isUpVoted) {
    src = emptyFingerDown;
    graphIcon = <ThumbsDownGraph size={[24, 24]} />;
  } else {
    src = fingerDownSingleQuestionPage;
    graphIcon = <ThumbsDownGraph size={[24, 24]} />;
  }

  return (
    <ImgBox src={src}>
      {graphCommunity ? graphIcon : <IconLg icon={src} fill={BORDER_PRIMARY_LIGHT} />}
    </ImgBox>
  );
}

DownvoteIcon.propTypes = {
  votingStatus: PropTypes.object,
  author: PropTypes.object,
  account: PropTypes.string,
};

export { UpvoteIcon, DownvoteIcon, ContentRating };
export default React.memo(ContentRating);
