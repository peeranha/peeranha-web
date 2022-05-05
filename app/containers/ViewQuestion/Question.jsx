import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import Content from './Content';
import { QUESTION_TYPE, POST_TYPES } from './constants';

export const Question = props => {
  const { postType, id } = props.questionData;

  const type = useMemo(
    () => {
      return POST_TYPES[postType];
    },
    [postType],
  );

  return (
    <Content
      {...props}
      answerId={0}
      type={QUESTION_TYPE}
      key={`${QUESTION_TYPE}${props.questionData.id}`}
      comments={props.questionData.comments}
      title={props.questionData.title}
      content={props.questionData.content}
      rating={props.questionData.rating}
      isItWrittenByMe={props.questionData.isItWrittenByMe}
      history={props.questionData.history}
      author={props.questionData.author}
      postTime={props.questionData.postTime}
      lastEditedDate={props.questionData.lastEditedDate}
      votingStatus={props.questionData.votingStatus}
      deleteItem={props.deleteQuestion}
      deleteItemLoading={props.deleteQuestionLoading}
      editItem={[
        props.redirectToEditQuestionPage,
        routes.questionEdit(type, id),
      ]}
      saveComment={props.saveComment}
      deleteComment={props.deleteComment}
      buttonParams={{
        questionId: props.questionData.id,
        answerId: 0,
        whowasvoted: props.questionData.author.id,
      }}
      communities={props.communities}
    />
  );
};

Question.propTypes = {
  questionData: PropTypes.object,
  communities: PropTypes.array,
  deleteQuestion: PropTypes.func,
  saveComment: PropTypes.func,
  redirectToEditQuestionPage: PropTypes.func,
  deleteComment: PropTypes.func,
  deleteQuestionLoading: PropTypes.bool,
};

export default React.memo(Question);
