import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';

import {
  BORDER_PRIMARY,
  BORDER_SECONDARY,
  TEXT_PRIMARY_DARK,
  TEXT_SECONDARY,
} from 'style-constants';

import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';

import answerIconEmptyInside from 'images/answerIconEmptyInside.svg?inline';

import Base from 'components/Base';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import Span from 'components/Span';
import A from 'components/A';
import RatingStatus from 'components/RatingStatus';
import QuestionForProfilePage from 'components/QuestionForProfilePage';

import messages from 'containers/Profile/messages';

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
  overflow: hidden;
  border: ${x => (x.bordered ? `1px solid ${BORDER_PRIMARY} !important` : '0')};
  > div:nth-child(2) {
    border-left: 1px solid ${BORDER_SECONDARY};
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;

    > div:nth-child(2) {
      border-left: none;
      border-top: 1px solid ${BORDER_SECONDARY};
    }
  }
`;

const LastAnswer = ({ lastAnswer, locale }) => {
  if (!lastAnswer) {
    return (
      <Span fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.noAnswersYet} />
      </Span>
    );
  }

  return (
    <span className="d-flex flex-column">
      {lastAnswer.author && (
        <A
          to={routes.profileView(lastAnswer.user)}
          className="d-flex align-items-center"
        >
          <Span className="mr-2" fontSize="14" lineHeight="18">
            {lastAnswer.author?.displayName}
          </Span>
          <RatingStatus rating={lastAnswer.author.rating} size="sm" isRankOff />
        </A>
      )}

      <Span fontSize="14" lineHeight="18" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.lastAnswer} />{' '}
        {getFormattedDate(
          lastAnswer.postTime,
          locale,
          MONTH_3LETTERS__DAY_YYYY_TIME,
        )}
      </Span>
    </span>
  );
};

/* eslint camelcase: 0 */
const Question = ({
  myPostRating,
  title,
  myPostTime,
  answers,
  locale,
  acceptedAnswer,
  communities,
  id,
  communityId,
  postType,
  isMyAnswerAccepted,
  isGeneral,
}) => (
  <Li className="mb-3" bordered={!isGeneral}>
    <QuestionForProfilePage
      route={routes.questionView(id, null)}
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
    />
    <RightBlock>
      <span className="d-flex align-items-center mb-2">
        <img src={answerIconEmptyInside} className="mr-2" alt="icon" />
        <Span color={TEXT_PRIMARY_DARK} bold>
          {answers.length}
        </Span>
      </span>

      <LastAnswer lastAnswer={answers[answers.length - 1]} locale={locale} />
    </RightBlock>
  </Li>
);

const QuestionsList = ({ questions, locale, communities }) => (
  <div>
    <ul>
      {questions.map(x => (
        <Question
          {...x}
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
  user: PropTypes.string,
};

Question.propTypes = {
  myPostRating: PropTypes.number,
  title: PropTypes.string,
  myPostTime: PropTypes.number,
  answers: PropTypes.array,
  locale: PropTypes.string,
  acceptedAnswer: PropTypes.bool,
  communities: PropTypes.array,
  id: PropTypes.string,
  postType: PropTypes.string,
  isMyAnswerAccepted: PropTypes.bool,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isGeneral: PropTypes.bool,
};

QuestionsList.propTypes = {
  questions: PropTypes.array,
  communities: PropTypes.array,
  locale: PropTypes.string,
};

export default QuestionsList;
