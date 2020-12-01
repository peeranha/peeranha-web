import React, { useState, memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';

import Button from 'components/Button/Outlined/PrimaryStretching';

import Content from './Content';
import { ANSWER_TYPE } from './constants';

import messages from './messages';

const DEFAULT_NUMBER = 10;

export const AnswersList = props => {
  const [allVisible, setAllVisible] = useState(false);
  const { answers } = props.questionData;

  const changeVisibility = useCallback(() => setAllVisible(!allVisible), [
    allVisible,
  ]);

  const visibleAnswers = useMemo(
    () => answers.slice(0, allVisible ? answers.length : DEFAULT_NUMBER),
    [answers, allVisible],
  );

  return (
    <>
      {visibleAnswers.map(
        ({
          id,
          comments,
          content,
          rating,
          isTheLargestRating,
          isItWrittenByMe,
          history,
          userInfo,
          post_time: postTime,
          lastEditedDate,
          votingStatus,
        }) => (
          <Content
            {...props}
            className="mb-3"
            type={ANSWER_TYPE}
            key={`${ANSWER_TYPE}${id}`}
            answerId={id}
            comments={comments}
            content={`${content}`}
            rating={rating}
            isTheLargestRating={isTheLargestRating}
            questionFrom={props.questionData.user}
            isItWrittenByMe={isItWrittenByMe}
            history={history}
            userInfo={userInfo}
            postTime={+postTime}
            lastEditedDate={lastEditedDate}
            votingStatus={votingStatus}
            deleteItem={props.deleteAnswer}
            deleteItemLoading={props.deleteAnswerLoading}
            editItem={[
              props.redirectToEditAnswerPage,
              routes.answerEdit(props.questionData.id, id),
            ]}
            saveComment={props.saveComment}
            deleteComment={props.deleteComment}
            buttonParams={{
              questionId: props.questionData.id,
              answerId: id,
              whowasvoted: userInfo.user,
            }}
          />
        ),
      )}

      {answers.length > DEFAULT_NUMBER && (
        <div className="d-flex">
          <Button className="py-2" onClick={changeVisibility}>
            <FormattedMessage
              id={messages.showMoreAnswers.id}
              values={{ value: `(${visibleAnswers.length}/${answers.length})` }}
            />
          </Button>
        </div>
      )}
    </>
  );
};

AnswersList.propTypes = {
  questionData: PropTypes.object,
  deleteAnswer: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
  redirectToEditAnswerPage: PropTypes.func,
  deleteAnswerLoading: PropTypes.bool,
};

export default memo(AnswersList);
