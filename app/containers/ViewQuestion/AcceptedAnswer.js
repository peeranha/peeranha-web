import React from 'react';
import PropTypes from 'prop-types';

import Content from './Content';

const AcceptedAnswer = props => (
  <div className="accepted-answer">
    {props.questionData.answers.map(
      item =>
        props.questionData.correct_answer_id === item.id ? (
          <Content
            {...props}
            answerId={item.id}
            comments={item.comments}
            content={item.content}
            rating={item.rating}
            questionFrom={props.questionData.user}
            isItWrittenByMe={item.isItWrittenByMe}
            history={item.history}
            userInfo={item.userInfo}
            postTime={item.post_time}
          />
        ) : null,
    )}
  </div>
);

AcceptedAnswer.propTypes = {
  questionData: PropTypes.object,
};

export default AcceptedAnswer;
