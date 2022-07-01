import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import QuestionForProfilePage from 'components/QuestionForProfilePage';
import { Li } from 'containers/QuestionsOfUser/QuestionsList';
import { POST_TYPE } from 'utils/constants';

/* eslint camelcase: 0 */
const Question = ({
  myPostRating,
  title,
  myPostTime,
  locale,
  acceptedAnswer,
  communities,
  id,
  communityId,
  isMyAnswerAccepted,
  postType,
  isTheLargestRating,
  answerId,
  isGeneral,
  elementType,
}) => {
  const [route, setRoute] = useState(() =>
    routes.questionView(id, answerId.split('-')[1]),
  );

  useEffect(
    () => {
      if (postType === POST_TYPE.expertPost) {
        setRoute(routes.expertPostView(id, answerId.split('-')[1]));
      }
    },
    [postType, id, answerId],
  );

  return (
    <Li className="mb-3">
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
        isTheLargestRating={isTheLargestRating}
        isGeneral={isGeneral}
        bordered={false}
        isAnswer
        elementType={elementType}
      />
    </Li>
  );
};

const QuestionsWithAnswersList = ({ questions, locale, communities }) => (
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
  myPostTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  acceptedAnswer: PropTypes.bool,
  communities: PropTypes.array,
  id: PropTypes.string,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isMyAnswerAccepted: PropTypes.bool,
  postType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isTheLargestRating: PropTypes.bool,
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isGeneral: PropTypes.bool,
};

QuestionsWithAnswersList.propTypes = {
  questions: PropTypes.array,
  locale: PropTypes.string,
  communities: PropTypes.array,
};

export default QuestionsWithAnswersList;
