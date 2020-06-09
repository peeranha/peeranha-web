import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';

import { isAnswerOfficial } from 'utils/properties';

import { TOP_COMMUNITY_DISPLAY_MIN_RATING } from 'containers/Questions/constants';

import AnswersTitle from './AnswersTitle';
import AnswersList from './AnswersList';
import AcceptedAnswer from './AcceptedAnswer';

export const Answers = ({
  questionData: { answers, ...questionData },
  ...props
}) => {
  if (!answers.length || !answers[0].content) return null;

  const updatedQuestionData = useMemo(
    () => {
      const sortedByRatingAnswers = orderBy(answers, 'rating', 'desc').map(
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
      const officialAnswerIds = officialAnswers.map(({ id }) => id);
      const rest = sortedByRatingAnswers.filter(
        ({ id }) => !officialAnswerIds.includes(id),
      );

      return {
        ...questionData,
        answers: officialAnswers.concat(rest),
      };
    },
    [answers, questionData],
  );

  return (
    <div>
      <AnswersTitle answersNum={answers.length} />
      <AcceptedAnswer {...props} questionData={updatedQuestionData} />
      <AnswersList {...props} questionData={updatedQuestionData} />
    </div>
  );
};

Answers.propTypes = {
  questionData: PropTypes.object,
};

export default React.memo(Answers);
