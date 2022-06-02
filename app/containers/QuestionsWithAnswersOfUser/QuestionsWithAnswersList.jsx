import React from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import QuestionForProfilePage from 'components/QuestionForProfilePage';
import { Li } from 'containers/QuestionsOfUser/QuestionsList';

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
}) => (
  <Li className="mb-3" postType={postType}>
    <QuestionForProfilePage
      route={routes.questionView(id, answerId.split('-')[1])}
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

const QuestionsWithAnswersList = ({ questions, locale, communities }) => (
  <div>
    <ul>
      {questions.map(x => (
        <Question
          myPostRating={x.myPostRating}
          title={x.title}
          myPostTime={x.myPostTime}
          acceptedAnswer={x.acceptedAnswer}
          id={x.id}
          communityId={x.communityId}
          isMyAnswerAccepted={x.isMyAnswerAccepted}
          postType={x.postType}
          isTheLargestRating={x.isTheLargestRating}
          answerId={x.answerId}
          isGeneral={x.isGeneral}
          elementType={x.elementType}
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
  elementType: PropTypes.string,
};

QuestionsWithAnswersList.propTypes = {
  questions: PropTypes.array,
  locale: PropTypes.string,
  communities: PropTypes.array,
};

export default QuestionsWithAnswersList;
