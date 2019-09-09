import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';
import { TEXT_PRIMARY_DARK, TEXT_SECONDARY } from 'style-constants';

import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';

import answerIconEmptyInside from 'images/answerIconEmptyInside.svg?inline';

import Base from 'components/Base';
import Span from 'components/Span';
import A from 'components/A';
import RatingStatus from 'components/RatingStatus';
import QuestionForProfilePage from 'components/QuestionForProfilePage';

import messages from 'containers/Profile/messages';

const RightBlock = Base.extend`
  padding-left: 20px;
  min-width: 240px;
  margin-top: 15px;
  word-break: break-all;
`;

const LastAnswer = ({ lastAnswer, locale, user }) => {
  if (!lastAnswer) {
    return (
      <Span fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.noAnswersYet} />
      </Span>
    );
  }

  return (
    <span className="d-flex flex-column">
      {lastAnswer.userInfo && (
        <A to={routes.profileView(user)} className="d-flex align-items-center">
          <Span className="mr-2" fontSize="14">
            {lastAnswer.userInfo.display_name}
          </Span>
          <RatingStatus
            rating={lastAnswer.userInfo.rating}
            size="sm"
            isRankOff
          />
        </A>
      )}

      <Span fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.lastAnswer} />{' '}
        {getFormattedDate(
          lastAnswer.post_time,
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
  community_id,
  postType,
  isMyAnswerAccepted,
  user,
}) => (
  <li className="d-flex">
    <QuestionForProfilePage
      route={routes.questionView(id)}
      myPostRating={myPostRating}
      title={title}
      myPostTime={myPostTime}
      locale={locale}
      acceptedAnswer={acceptedAnswer}
      communities={communities}
      id={id}
      community_id={community_id}
      postType={postType}
      isMyAnswerAccepted={isMyAnswerAccepted}
    />
    <RightBlock
      className="d-flex flex-column align-items-start"
      position="right"
    >
      <span className="d-flex align-items-center mb-2">
        <img src={answerIconEmptyInside} className="mr-2" alt="icon" />
        <Span color={TEXT_PRIMARY_DARK} bold>
          {answers.length}
        </Span>
      </span>

      <LastAnswer
        user={user}
        lastAnswer={answers[answers.length - 1]}
        locale={locale}
      />
    </RightBlock>
  </li>
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
  user: PropTypes.string,
  isMyAnswerAccepted: PropTypes.bool,
  community_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

QuestionsList.propTypes = {
  questions: PropTypes.array,
  communities: PropTypes.array,
  locale: PropTypes.string,
};

export default QuestionsList;
