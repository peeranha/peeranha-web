import React from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

const AnswersList = props => (
  <div className="answers-list">
    {props.questionData.answers.map(
      item =>
        props.questionData.correct_answer_id !== item.id ? (
          <Content
            {...props}
            type="answer"
            key={`asnwer${item.id}`}
            answerId={item.id}
            comments={item.comments}
            content={item.content}
            rating={item.rating}
            questionFrom={props.questionData.user}
            isItWrittenByMe={item.isItWrittenByMe}
            history={item.history}
            userInfo={item.userInfo}
            postTime={item.post_time}
            votingStatus={item.votingStatus}
            deleteItem={props.deleteAnswer}
            editItem={props.editAnswer}
            editComment={props.editComment}
            saveComment={props.saveComment}
            editCommentState={props.editCommentState}
            deleteComment={props.deleteComment}
            buttonParams={{
              questionId: props.questionData.id,
              answerId: item.id,
            }}
          />
        ) : null,
    )}
  </div>
);

AnswersList.propTypes = {
  questionData: PropTypes.object,
  editCommentState: PropTypes.object,
  deleteAnswer: PropTypes.func,
  editAnswer: PropTypes.func,
  editComment: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
};

export default AnswersList;
