/* eslint indent: 0 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import fingerUpSingleQuestionPage from 'images/fingerUpSingleQuestionPage.svg?inline';
import greenFingerUpSingleQuestion from 'images/greenFingerUpSingleQuestion.svg?inline';
import fingerDownSingleQuestionPage from 'images/fingerDownSingleQuestionPage.svg?inline';
import redFingerDownSingleQuestion from 'images/redFingerDownSingleQuestion.svg?inline';
import disabledFingerUp from 'images/disabledFingerUp.svg?inline';
import disabledFingerDown from 'images/disabledFingerDown.svg?inline';
import emptyFingerUp from 'images/emptyFingerUp.svg?inline';
import emptyFingerDown from 'images/emptyFingerDown.svg?inline';

import { BORDER_SUCCESS, BORDER_WARNING_LIGHT } from 'style-constants';
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

    ${x =>
      x.src === greenFingerUpSingleQuestion
        ? `border: 1px solid ${BORDER_SUCCESS};`
        : ``};

    ${x =>
      x.src === redFingerDownSingleQuestion
        ? `border: 1px solid ${BORDER_WARNING_LIGHT};`
        : ``};
  }

  @media only screen and (max-width: 576px) {
    ${x =>
      x.src === greenFingerUpSingleQuestion ||
      x.src === redFingerDownSingleQuestion
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
  userInfo,
  ids,
}) => (
  <React.Fragment>
    <Button
      className="overflow-initial"
      onClick={upVote}
      disabled={ids.includes(`${UP_VOTE_BUTTON}${answerId}`)}
      id={`${UP_VOTE_BUTTON}${answerId}`}
      data-answerid={answerId}
      data-whowasupvoted={userInfo.user}
    >
      <UpvoteIcon
        account={account}
        userInfo={userInfo}
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
      data-whowasdownvoted={userInfo.user}
    >
      <DownvoteIcon
        account={account}
        userInfo={userInfo}
        votingStatus={votingStatus}
      />
    </Button>
  </React.Fragment>
);

ContentRating.propTypes = {
  rating: PropTypes.number,
  votingStatus: PropTypes.object,
  userInfo: PropTypes.object,
  account: PropTypes.string,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  ids: PropTypes.array,
  answerId: PropTypes.number,
};

function UpvoteIcon({ account, userInfo, votingStatus }) {
  let src = null;

  if (account === userInfo.user) {
    src = disabledFingerUp;
  } else if (votingStatus.isUpVoted) {
    src = greenFingerUpSingleQuestion;
  } else if (votingStatus.isDownVoted) {
    src = emptyFingerUp;
  } else {
    src = fingerUpSingleQuestionPage;
  }

  return (
    <ImgBox src={src}>
      <img src={src} alt="voteup" />
    </ImgBox>
  );
}

UpvoteIcon.propTypes = {
  votingStatus: PropTypes.object,
  userInfo: PropTypes.object,
  account: PropTypes.string,
};

function DownvoteIcon({ account, userInfo, votingStatus }) {
  let src = null;

  if (account === userInfo.user) {
    src = disabledFingerDown;
  } else if (votingStatus.isDownVoted) {
    src = redFingerDownSingleQuestion;
  } else if (votingStatus.isUpVoted) {
    src = emptyFingerDown;
  } else {
    src = fingerDownSingleQuestionPage;
  }

  return (
    <ImgBox src={src}>
      <img src={src} alt="votedown" />
    </ImgBox>
  );
}

DownvoteIcon.propTypes = {
  votingStatus: PropTypes.object,
  userInfo: PropTypes.object,
  account: PropTypes.string,
};

export { UpvoteIcon, DownvoteIcon, ContentRating };
export default React.memo(ContentRating);
