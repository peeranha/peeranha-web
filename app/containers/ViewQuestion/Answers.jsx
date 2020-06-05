import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';

import { TOP_COMMUNITY_DISPLAY_MIN_RATING } from 'containers/Questions/constants';

import AnswersTitle from './AnswersTitle';
import AnswersList from './AnswersList';
import AcceptedAnswer from './AcceptedAnswer';

export const Answers = props => {
  const {
    questionData: { answers },
  } = props;

  if (!answers.length || !answers[0].content) return null;

  const sortedByRatingAnswers = useMemo(
    () =>
      orderBy(answers, 'rating', 'desc').map(x => ({
        ...x,
        isTheLargestRating: false,
      })),
    [answers],
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
      <AnswersTitle answersNum={answers.length} />
      <AcceptedAnswer {...props} questionData={questionDataWithSortedAnswers} />
      <AnswersList {...props} questionData={questionDataWithSortedAnswers} />
    </div>
  );
};

Answers.propTypes = {
  questionData: PropTypes.object,
};

export default React.memo(Answers);
