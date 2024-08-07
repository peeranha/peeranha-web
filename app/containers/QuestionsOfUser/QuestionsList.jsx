import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as routes from 'routes-config';
import { getPostRoute } from 'routes-config';

import {
  BORDER_PRIMARY,
  BORDER_RADIUS_L,
  BORDER_SECONDARY,
  TEXT_PRIMARY_DARK,
  TEXT_SECONDARY,
} from 'style-constants';
import answerIconEmptyInside from 'images/answerIconEmptyInside.svg?inline';

import { getFormattedDate } from 'utils/datetime';
import { isSuiBlockchain, MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import { getUserName } from 'utils/user';

import Base from 'components/Base';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import Span from 'components/Span';
import A from 'components/A';
import QuestionForProfilePage from 'components/QuestionForProfilePage';
import { ChatTextGraph } from 'components/icons';

import { POST_TYPE_ANSWER } from '../Profile/constants';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const RightBlock = Base.extend`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom-right-radius: ${BORDER_RADIUS_L};
  border-top-right-radius: ${BORDER_RADIUS_L};

  @media only screen and (min-width: 768px) {
    padding: 25px 20px;
    flex: 0 0 240px;
    width: 240px;
  }
`;

export const Li = BaseRoundedNoPadding.extend`
  display: flex;
  border: ${(x) =>
    x.bordered || isSuiBlockchain || graphCommunity
      ? `1px solid ${colors.border || BORDER_PRIMARY} !important`
      : 'none'};

  > div:nth-child(1) {
    border-top-left-radius: ${BORDER_RADIUS_L} !important;
    border-bottom-left-radius: ${BORDER_RADIUS_L} !important;
  }
  > div:nth-child(2) {
    border-top-right-radius: ${BORDER_RADIUS_L} !important;
    border-bottom-right-radius: ${BORDER_RADIUS_L} !important;
    border-left: 1px solid ${graphCommunity ? '#3D3D54' : BORDER_SECONDARY};
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;

    > div:nth-child(2) {
      border-left: none;
      border-top: 1px solid ${graphCommunity ? '#3D3D54' : BORDER_SECONDARY};
    }
  }

  :hover {
    box-shadow: ${graphCommunity ? 'none' : '5px 5px 5px rgba(40, 40, 40, 0.1)'};
  }
`;

const LastAnswer = ({ lastAnswer, locale }) => {
  const { t } = useTranslation();

  if (!lastAnswer) {
    return (
      <Span fontSize="14" color={TEXT_SECONDARY} css={graphCommunity && { color: '#A7A7AD' }}>
        {t('profile.noAnswersYet')}
      </Span>
    );
  }

  return (
    <span className="d-flex flex-column">
      {lastAnswer.author && (
        <A to={routes.profileView(lastAnswer.author.id)} className="d-flex align-items-center">
          <Span
            className="mr-2"
            fontSize="14"
            lineHeight="18"
            css={graphCommunity && { color: '#E1E1E4' }}
          >
            {getUserName(lastAnswer.author?.displayName, lastAnswer.author.id)}
          </Span>
        </A>
      )}

      <Span
        fontSize="14"
        lineHeight="18"
        color={TEXT_SECONDARY}
        css={graphCommunity && { color: '#A7A7AD' }}
      >
        {t('profile.lastAnswer')}{' '}
        {getFormattedDate(lastAnswer?.postTime, locale, MONTH_3LETTERS__DAY_YYYY_TIME)}
      </Span>
    </span>
  );
};

const Question = ({
  myPostRating,
  title,
  myPostTime,
  replies,
  locale,
  acceptedAnswer,
  communities,
  id,
  communityId,
  postType,
  isMyAnswerAccepted,
  isGeneral,
  elementType,
  answerId,
}) => {
  const answerRouteId = elementType === POST_TYPE_ANSWER ? answerId.split('-')[2] : null;

  const route = getPostRoute({ postType, id, answerId: answerRouteId, title });

  return (
    <Li className="mb-3" postType={postType}>
      <QuestionForProfilePage
        route={route}
        myPostRating={myPostRating}
        title={title}
        myPostTime={myPostTime}
        locale={locale}
        acceptedAnswer={acceptedAnswer}
        communities={communities}
        id={id}
        communityId={communityId}
        postType={postType}
        isMyAnswerAccepted={isMyAnswerAccepted}
        isGeneral={isGeneral}
        elementType={elementType}
      />
      <RightBlock>
        <span className="d-flex align-items-center mb-2">
          {graphCommunity ? (
            <ChatTextGraph className="mr-2" size={[24, 24]} />
          ) : (
            <img src={answerIconEmptyInside} className="mr-2" alt="icon" />
          )}
          <Span color={TEXT_PRIMARY_DARK} bold>
            {replies.length}
          </Span>
        </span>

        <LastAnswer lastAnswer={replies[replies.length - 1]} locale={locale} />
      </RightBlock>
    </Li>
  );
};

const QuestionsList = ({ questions, locale, communities }) => (
  <div>
    <ul>
      {questions.map((x) => (
        <Question
          myPostRating={x.myPostRating}
          title={x.title}
          myPostTime={x.myPostTime}
          replies={x.replies}
          acceptedAnswer={x.acceptedAnswer}
          id={x.id}
          communityId={x.communityId}
          postType={x.postType}
          isMyAnswerAccepted={x.isMyAnswerAccepted}
          isGeneral={x.isGeneral}
          elementType={x.elementType}
          locale={locale}
          communities={communities}
          key={`question_${x.id}`}
        />
      ))}
    </ul>
  </div>
);

LastAnswer.propTypes = {
  lastAnswer: PropTypes.object,
  locale: PropTypes.string,
};

Question.propTypes = {
  myPostRating: PropTypes.number,
  title: PropTypes.string,
  myPostTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  replies: PropTypes.array,
  locale: PropTypes.string,
  acceptedAnswer: PropTypes.bool,
  communities: PropTypes.array,
  id: PropTypes.string,
  postType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isMyAnswerAccepted: PropTypes.bool,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isGeneral: PropTypes.bool,
  elementType: PropTypes.string,
};

QuestionsList.propTypes = {
  questions: PropTypes.array,
  communities: PropTypes.array,
  locale: PropTypes.string,
};

export default QuestionsList;
