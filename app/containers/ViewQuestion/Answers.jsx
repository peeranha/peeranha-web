import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';

import { TOP_COMMUNITY_DISPLAY_MIN_RATING } from 'containers/Questions/constants';

import AnswersTitle from './AnswersTitle';
import AnswersList from './AnswersList';
import AcceptedAnswer from './AcceptedAnswer';

export const Answers = props => {
  const answersList = props.questionData.answers;

  if (!answersList.length || !answersList[0].content) return null;

  const sortedByRatingAnswers = orderBy(answersList, 'rating', 'desc').map(
    x => ({
      ...x,
      isTheLargestRating: false,
    }),
  );

  const [A1, A2] = sortedByRatingAnswers;

  if ((A1 && A2 && A1.rating > A2.rating) || (A1 && !A2)) {
    A1.isTheLargestRating = A1.rating > TOP_COMMUNITY_DISPLAY_MIN_RATING;
  }

  const questionDataWithSortedAnswers = {
    ...props.questionData,
    answers: sortedByRatingAnswers,
  };

  return (
    <div>
      <AnswersTitle answersNum={answersList.length} />
      <AcceptedAnswer {...props} questionData={questionDataWithSortedAnswers} />
      <AnswersList {...props} questionData={questionDataWithSortedAnswers} />
    </div>
  );
};

Answers.propTypes = {
  questionData: PropTypes.object,
};

export default React.memo(Answers);
