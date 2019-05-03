import React from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';
import QuestionForProfilePage from 'components/QuestionForProfilePage';

/* eslint camelcase: 0 */
const Question = /* istanbul ignore next */ ({
  myPostRating,
  title,
  myPostTime,
  locale,
  acceptedAnswer,
  communities,
  id,
  community_id,
  isMyAnswerAccepted,
  postType,
  isTheLargestRating,
  answerId,
}) => (
  <QuestionForProfilePage
    route={routes.questionView(id, answerId)}
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
    isTheLargestRating={isTheLargestRating}
  />
);

const QuestionsWithAnswersList = /* istanbul ignore next */ ({
  questions,
  locale,
  communities,
}) => (
  <div>
    <ul>
      {questions.map(x => (
        <Question
          {...x}
          locale={locale}
          communities={communities}
          key={`answer_${x.id}`}
        />
      ))}
    </ul>
  </div>
);

Question.propTypes = {
  myPostRating: PropTypes.number,
  title: PropTypes.string,
  myPostTime: PropTypes.number,
  locale: PropTypes.string,
  acceptedAnswer: PropTypes.bool,
  communities: PropTypes.array,
  id: PropTypes.string,
  community_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isMyAnswerAccepted: PropTypes.bool,
  postType: PropTypes.string,
  isTheLargestRating: PropTypes.bool,
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

QuestionsWithAnswersList.propTypes = {
  questions: PropTypes.array,
  locale: PropTypes.string,
  communities: PropTypes.array,
};

export default QuestionsWithAnswersList;
