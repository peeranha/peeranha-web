import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as routes from 'routes-config';

import {
  BORDER_PRIMARY,
  BORDER_RADIUS_L,
  BORDER_SECONDARY,
  EXPERT_BACKLIGHT,
  TEXT_PRIMARY_DARK,
  TEXT_SECONDARY,
  TUTORIAL_BACKLIGHT,
} from 'style-constants';

import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME, POST_TYPE } from 'utils/constants';

import answerIconEmptyInside from 'images/answerIconEmptyInside.svg?inline';

import Base from 'components/Base';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import Span from 'components/Span';
import A from 'components/A';
import QuestionForProfilePage from 'components/QuestionForProfilePage';

import { getUserName } from 'utils/user';
import { POST_TYPE_ANSWER } from '../Profile/constants';
import { getPostRoute } from '../../routes-config';

const RightBlock = Base.extend`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media only screen and (min-width: 768px) {
    padding: 25px 20px;
    flex: 0 0 240px;
    width: 240px;
  }
`;

export const Li = BaseRoundedNoPadding.extend`
  display: flex;
  border: ${(x) =>
    x.bordered ? `1px solid ${BORDER_PRIMARY} !important` : '0'};
  box-shadow: ${({ postType }) => {
    if (postType === POST_TYPE.expertPost) {
      return `3px 3px 5px ${EXPERT_BACKLIGHT}`;
    }

    if (postType === POST_TYPE.tutorial) {
      return `3px 3px 5px ${TUTORIAL_BACKLIGHT}`;
    }

    return null;
  }};
  > div:nth-child(1) {
    border-top-left-radius: ${BORDER_RADIUS_L} !important;
    border-bottom-left-radius: ${BORDER_RADIUS_L} !important;
  }
  > div:nth-child(2) {
    border-top-right-radius: ${BORDER_RADIUS_L} !important;
    border-bottom-right-radius: ${BORDER_RADIUS_L} !important;
    border-left: 1px solid ${BORDER_SECONDARY};
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;

    > div:nth-child(2) {
      border-left: none;
      border-top: 1px solid ${BORDER_SECONDARY};
    }
  }

  :hover {
    box-shadow: 5px 5px 5px rgba(40, 40, 40, 0.1);
  }
`;

const LastAnswer = ({ lastAnswer, locale }) => {
  const { t } = useTranslation();

  if (!lastAnswer) {
    return (
      <Span fontSize="14" color={TEXT_SECONDARY}>
        {t('profile.noAnswersYet')}
      </Span>
    );
  }

  return (
    <span className="d-flex flex-column">
      {lastAnswer.author && (
        <A
          to={routes.profileView(lastAnswer.author.id)}
          className="d-flex align-items-center"
        >
          <Span className="mr-2" fontSize="14" lineHeight="18">
            {getUserName(lastAnswer.author?.displayName, lastAnswer.author.id)}
          </Span>
        </A>
      )}

      <Span fontSize="14" lineHeight="18" color={TEXT_SECONDARY}>
        {t('profile.lastAnswer')}{' '}
        {getFormattedDate(
          lastAnswer.postTime,
          locale,
          MONTH_3LETTERS__DAY_YYYY_TIME,
        )}
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
  const answerRouteId =
    elementType === POST_TYPE_ANSWER ? answerId.split('-')[1] : null;

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
          <img src={answerIconEmptyInside} className="mr-2" alt="icon" />
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
