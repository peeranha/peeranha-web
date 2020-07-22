import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import _orderBy from 'lodash/orderBy';
import _uniqBy from 'lodash/uniqBy';

import { isAnswerOfficial } from 'utils/properties';

import { TOP_COMMUNITY_DISPLAY_MIN_RATING } from 'containers/Questions/constants';

import AnswersTitle from './AnswersTitle';
import AnswersList from './AnswersList';

export const Answers = ({
  questionData: { answers, ...questionData },
  ...props
}) => {
  if (!answers.length || !answers[0].content) return null;

  const updatedQuestionData = useMemo(
    () => {
      const sortedByRatingAnswers = _orderBy(answers, 'rating', 'desc').map(
        x => ({
          ...x,
          isTheLargestRating: false,
        }),
      );
      const [A1, A2] = sortedByRatingAnswers;

      if ((A1 && A2 && A1.rating > A2.rating) || (A1 && !A2)) {
        A1.isTheLargestRating = A1.rating > TOP_COMMUNITY_DISPLAY_MIN_RATING;
      }

      const officialAnswers = sortedByRatingAnswers.filter(answer =>
        isAnswerOfficial(answer),
      );

      const correctAnswer = sortedByRatingAnswers.find(
        ({ id }) => id === questionData.correct_answer_id,
      );
      const officialAnswerIds = officialAnswers.map(({ id }) => id);
      const rest = sortedByRatingAnswers.filter(
        ({ id }) =>
          !(officialAnswerIds.includes(id) || id === correctAnswer?.id),
      );

      return {
        ...questionData,
        answers: _uniqBy(
          officialAnswers
            .concat([correctAnswer])
            .concat(rest)
            .filter(Boolean),
          'id',
        ),
      };
    },
    [answers, questionData],
  );

  return (
    <div>
      <AnswersTitle answersNum={answers.length} />
      <AnswersList {...props} questionData={updatedQuestionData} />
    </div>
  );
};

Answers.propTypes = {
  questionData: PropTypes.object,
};

export default React.memo(Answers);
