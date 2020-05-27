import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import BaseNoPadding from 'components/Base/BaseRoundedNoPadding';

import {
  addToTopQuestions,
  downQuestion,
  moveQuestion,
  removeFromTopQuestions,
  upQuestion,
} from '../actions';
import { makeSelectProfileInfo } from '../../AccountProvider/selectors';
import * as questionsSelector from '../selectors';
import AdditionalInfo from './AdditionalInfo';
import MoveSection from './MoveSection';
import Body from './Body';

const Box = BaseNoPadding.extend`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 15px;
  flex-direction: row;
  position: relative;
  transition: none;

  @media only screen and (max-width: 576px) {
    flex-direction: column;
  }
`;
const Div = styled.div`
  width: 100%;
  display: flex;

  @media only screen and (max-width: 576px) {
    flex-direction: row;
  }
`;

/* eslint camelcase: 0 */
const QI = ({
  id,
  title,
  user,
  userInfo,
  post_time,
  locale,
  community_id,
  communities,
  tags,
  rating,
  answers,
  correct_answer_id,
  isGeneral,
  first,
  last,
  index,
  isTopQuestion,
  profileInfo,
  questionFilter,
  addToTopQuestionsDispatch,
  removeFromTopQuestionsDispatch,
  upQuestionDispatch,
  downQuestionDispatch,
  topQuestionActionProcessing,
  moveQuestionDispatch,
}) => {
  const ref = useRef(null);

  const displayPin = useMemo(() => !!profileInfo && profileInfo.isAdmin, [
    profileInfo,
  ]);

  const displayPinMove = useMemo(
    () => displayPin && isTopQuestion && questionFilter === 1,
    [isTopQuestion, displayPin, questionFilter],
  );

  const upQuestionMethod = useCallback(
    () => {
      upQuestionDispatch(id);
    },
    [id],
  );

  const downQuestionMethod = useCallback(
    () => {
      downQuestionDispatch(id);
    },
    [id],
  );

  const onDragStart = useCallback(
    e => {
      e.dataTransfer.setData('id', id);
    },
    [index, id],
  );

  const onDrop = useCallback(
    e => {
      const data = e.dataTransfer.getData('id');

      if (data !== id) {
        moveQuestionDispatch(data, index);
      }

      e.dataTransfer.clearData();
      e.preventDefault();
    },
    [index, id],
  );

  const onDragOver = useCallback(e => {
    e.preventDefault();
  }, []);

  return (
    <Box
      index={index}
      innerRef={ref}
      bordered={!isGeneral}
      draggable={profileInfo && profileInfo.isAdmin && questionFilter === 1}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
    >
      <AdditionalInfo
        correctAnswerId={correct_answer_id}
        answers={answers}
        rating={rating}
      />
      <Div>
        {displayPinMove && (
          <MoveSection
            first={first}
            last={last}
            topQuestionActionProcessing={topQuestionActionProcessing}
            upQuestionMethod={upQuestionMethod}
            downQuestionMethod={downQuestionMethod}
          />
        )}
        <Body
          id={id}
          displayPin={displayPin}
          title={title}
          user={user}
          userInfo={userInfo}
          postTime={post_time}
          locale={locale}
          communityId={community_id}
          communities={communities}
          tags={tags}
          isGeneral={isGeneral}
          displayPinMove={displayPinMove}
          profileInfo={profileInfo}
          isTopQuestion={isTopQuestion}
          topQuestionActionProcessing={topQuestionActionProcessing}
          addToTopQuestionsDispatch={addToTopQuestionsDispatch}
          removeFromTopQuestionsDispatch={removeFromTopQuestionsDispatch}
        />
      </Div>
    </Box>
  );
};

const QuestionItem = connect(
  state => ({
    profileInfo: makeSelectProfileInfo()(state),
    questionFilter: questionsSelector.selectQuestionFilter()(state),
    topQuestionActionProcessing: questionsSelector.selectTopQuestionActionProcessing()(
      state,
    ),
  }),
  dispatch => ({
    addToTopQuestionsDispatch: bindActionCreators(addToTopQuestions, dispatch),
    removeFromTopQuestionsDispatch: bindActionCreators(
      removeFromTopQuestions,
      dispatch,
    ),
    upQuestionDispatch: bindActionCreators(upQuestion, dispatch),
    downQuestionDispatch: bindActionCreators(downQuestion, dispatch),
    moveQuestionDispatch: bindActionCreators(moveQuestion, dispatch),
  }),
)(QI);

export const Content = ({ questionsList, locale, communities }) => (
  <div className="position-relative">
    {questionsList.map((item, index) => (
      <QuestionItem
        {...item}
        index={index}
        first={index === 0}
        last={index === questionsList.length - 1}
        locale={locale}
        communities={communities}
        key={item.id}
      />
    ))}
  </div>
);

QI.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  user: PropTypes.string,
  userInfo: PropTypes.object,
  post_time: PropTypes.number,
  locale: PropTypes.string,
  community_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communities: PropTypes.array,
  tags: PropTypes.array,
  rating: PropTypes.number,
  answers: PropTypes.array,
  correct_answer_id: PropTypes.number,
  isGeneral: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
  index: PropTypes.number,
  isTopQuestion: PropTypes.bool,
  addToTopQuestionsDispatch: PropTypes.func,
  removeFromTopQuestionsDispatch: PropTypes.func,
  profileInfo: PropTypes.object,
  questionFilter: PropTypes.number,
  upQuestionDispatch: PropTypes.func,
  downQuestionDispatch: PropTypes.func,
  topQuestionActionProcessing: PropTypes.bool,
  moveQuestionDispatch: PropTypes.func,
};

Content.propTypes = {
  questionsList: PropTypes.array,
  locale: PropTypes.string,
  communities: PropTypes.array,
};

export { QuestionItem };
export default React.memo(Content);
