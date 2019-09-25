import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button/Outlined/PrimaryStretching';

import Content from './Content';
import { ANSWER_TYPE } from './constants';

import messages from './messages';

const DEFAULT_NUMBER = 10;

export const AnswersList = props => {
  const [allVisible, changeVisibility] = useState(false);
  const { answers } = props.questionData;

  const visibleNumber = allVisible ? answers.length : DEFAULT_NUMBER;
  const visibleAnswers = answers.slice(0, visibleNumber);

  return (
    <React.Fragment>
      {visibleAnswers.map(
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

      {answers.length > DEFAULT_NUMBER && (
        <div className="d-flex">
          <Button
            className="py-2"
            onClick={() => changeVisibility(!allVisible)}
          >
            <FormattedMessage
              id={messages.showMoreAnswers.id}
              values={{ value: `(${visibleAnswers.length}/${answers.length})` }}
            />
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

AnswersList.propTypes = {
  questionData: PropTypes.object,
  deleteAnswer: PropTypes.func,
  editAnswer: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
};

export default React.memo(AnswersList);
