import React from 'react';
import PropTypes from 'prop-types';

import Content from './Content';
import { ANSWER_TYPE } from './constants';

const AnswersList = props => (
  <React.Fragment>
    {props.questionData.answers.map(
      item =>
        props.questionData.correct_answer_id !== item.id ? (
          <Content
            {...props}
            className="mb-3"
            type={ANSWER_TYPE}
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
            editItem={props.editAnswer}
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
  </React.Fragment>
);

AnswersList.propTypes = {
  questionData: PropTypes.object,
  deleteAnswer: PropTypes.func,
  editAnswer: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
};

export default React.memo(AnswersList);
