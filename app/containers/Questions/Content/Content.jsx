import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import BaseNoPadding from 'components/Base/BaseRoundedNoPadding';

import { officialAnswersCount } from 'utils/properties';

import { downQuestion, moveQuestion, upQuestion } from '../actions';
import {
  isQuestionTop,
  selectQuestionFilter,
  selectTopQuestionActionProcessing,
  selectTopQuestions,
} from '../selectors';
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
  questionBounty,
  questionFilter,
  isModerator,
  topQuestions,
  upQuestionDispatch,
  downQuestionDispatch,
  topQuestionActionProcessing,
  moveQuestionDispatch,
}) => {
  const ref = useRef(null);

  const displayTopQuestionMove = useMemo(
    () => isModerator && isTopQuestion && questionFilter === 1,
    [isTopQuestion, isModerator, questionFilter],
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
      e.preventDefault();
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

  const offAnswersCount = useMemo(() => officialAnswersCount({ answers }), [
    answers,
  ]);

  return (
    <Box
      index={index}
      innerRef={ref}
      bordered={!isGeneral}
      draggable={isModerator && questionFilter === 1}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragStart={onDragStart}
    >
      <AdditionalInfo
        correctAnswerId={correct_answer_id}
        answers={answers}
        rating={rating}
        officialAnswersCount={offAnswersCount}
      />
      <Div>
        {displayTopQuestionMove && (
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
          isModerator={isModerator}
          title={title}
          user={user}
          userInfo={userInfo}
          postTime={post_time}
          locale={locale}
          communityId={community_id}
          communities={communities}
          tags={tags}
          isGeneral={isGeneral}
          displayTopQuestionMove={displayTopQuestionMove}
          profileInfo={profileInfo}
          questionBounty={questionBounty}
          isTopQuestion={isTopQuestion}
          topQuestionsCount={topQuestions.length}
          topQuestionActionProcessing={topQuestionActionProcessing}
        />
      </Div>
    </Box>
  );
};

const QuestionItem = connect(
  (state, { id }) => ({
    questionFilter: selectQuestionFilter()(state),
    topQuestions: selectTopQuestions()(state),
    topQuestionActionProcessing: selectTopQuestionActionProcessing()(state),
    isTopQuestion: isQuestionTop(id)(state),
  }),
  dispatch => ({
    upQuestionDispatch: bindActionCreators(upQuestion, dispatch),
    downQuestionDispatch: bindActionCreators(downQuestion, dispatch),
    moveQuestionDispatch: bindActionCreators(moveQuestion, dispatch),
  }),
)(QI);

export const Content = ({
  questionsList,
  locale,
  communities,
  isModerator,
  profileInfo,
}) => (
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
        isModerator={isModerator}
        profileInfo={profileInfo}
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
  isModerator: PropTypes.bool,
  isTopQuestion: PropTypes.bool,
  profileInfo: PropTypes.object,
  questionFilter: PropTypes.number,
  upQuestionDispatch: PropTypes.func,
  downQuestionDispatch: PropTypes.func,
  topQuestionActionProcessing: PropTypes.bool,
  moveQuestionDispatch: PropTypes.func,
  topQuestions: PropTypes.array,
};

Content.propTypes = {
  questionsList: PropTypes.array,
  locale: PropTypes.string,
  communities: PropTypes.array,
  isModerator: PropTypes.bool,
  profileInfo: PropTypes.object,
};

export { QuestionItem };
export default React.memo(Content);
