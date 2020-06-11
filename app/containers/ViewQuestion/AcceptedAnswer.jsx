import React from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import Content from './Content';
import { ANSWER_TYPE } from './constants';

export const AcceptedAnswer = props => (
  <>
    {props.questionData.answers.map(
      item =>
        props.questionData.correct_answer_id === item.id ? (
          <Content
            {...props}
            className="mb-3"
            key={`${ANSWER_TYPE}${item.id}`}
            answerId={item.id}
            comments={item.comments}
            content={item.content}
            rating={item.rating}
            isTheLargestRating={item.isTheLargestRating}
            questionFrom={props.questionData.user}
            isItWrittenByMe={item.isItWrittenByMe}
            history={item.history}
            userInfo={item.userInfo}
            postTime={item.post_time}
            lastEditedDate={item.lastEditedDate}
            votingStatus={item.votingStatus}
            deleteItem={props.deleteAnswer}
            deleteItemLoading={props.deleteAnswerLoading}
            editItem={[
              props.redirectToEditAnswerPage,
              routes.answerEdit(props.questionData.id, item.id),
            ]}
            saveComment={props.saveComment}
            deleteComment={props.deleteComment}
            buttonParams={{
              questionId: props.questionData.id,
              answerId: item.id,
              whowasvoted: item.userInfo.user,
            }}
          />
        ) : null,
    )}
  </>
);

AcceptedAnswer.propTypes = {
  questionData: PropTypes.object,
  deleteAnswer: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
  redirectToEditAnswerPage: PropTypes.func,
  deleteAnswerLoading: PropTypes.bool,
};

export default React.memo(AcceptedAnswer);
