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
          />
        ) : null,
    )}
  </div>
);

AnswersList.propTypes = {
  questionData: PropTypes.object,
};

export default AnswersList;
