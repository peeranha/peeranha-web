import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { getPostRoute } from 'routes-config';
import BaseNoPadding from 'components/Base/BaseRoundedNoPadding';
import createdHistory from 'createdHistory';

import { officialAnswersCount } from 'utils/properties';
import { graphCommunityColors } from 'utils/communityManagement';
import { POST_TYPE } from 'utils/constants';

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
import Pagination from './Pagination';

import { isGeneralQuestion } from '../../ViewQuestion/saga';

const graphCommunity = graphCommunityColors();

const Box = BaseNoPadding.extend`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 15px;
  flex-direction: row;
  position: relative;
  transition: none;
  cursor: pointer;
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
  ipfsHash,
  title,
  author,
  postTime,
  locale,
  communityId,
  communities,
  tags,
  rating,
  answers,
  bestReply,
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
  isPromoted,
  isHomePage,
  isSearchPage,
  replyCount,
  postType,
  isFeed,
  isCommunityFeed,
  language,
  translations,
  handle,
  messengerType,
}) => {
  const ref = useRef(null);
  const link = getPostRoute({ postType, id, title });
  const isExpert = postType === POST_TYPE.expertPost;

  const displayTopQuestionMove = useMemo(
    () => isModerator && isTopQuestion && questionFilter === 1 && !isPromoted && !isHomePage,
    [isTopQuestion, isModerator, questionFilter, isPromoted, isHomePage],
  );

  const upQuestionMethod = useCallback(() => {
    upQuestionDispatch(id);
  }, [id]);

  const downQuestionMethod = useCallback(() => {
    downQuestionDispatch(id);
  }, [id]);

  const onDragStart = useCallback(
    (e) => {
      e.dataTransfer.setData('id', id);
    },
    [index, id],
  );

  const onDrop = useCallback(
    (e) => {
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

  const onDragOver = useCallback((e) => {
    if (!isPromoted) {
      e.preventDefault();
    }
  }, []);

  const offAnswersCount = isSearchPage
    ? 0
    : useMemo(() => officialAnswersCount({ answers }), [answers]);

  return (
    <Box
      index={index}
      innerRef={ref}
      isTutorial={postType === POST_TYPE.tutorial}
      isDiscussion={postType === POST_TYPE.generalPost}
      draggable={isModerator && !isHomePage && questionFilter === 1 && !isPromoted}
      onDrop={!isHomePage ? onDrop : undefined}
      onDragOver={!isHomePage ? onDragOver : undefined}
      onDragStart={!isHomePage ? onDragStart : undefined}
      isPromoted={isPromoted}
      isExpert={isExpert}
      onClick={() => createdHistory.push(link)}
      css={
        graphCommunity && {
          ':hover': {
            backgroundColor: 'rgb(36, 34, 50)',
            div: { backgroundColor: 'rgb(36, 34, 50)' },
          },
        }
      }
    >
      {postType !== POST_TYPE.documentation && (
        <AdditionalInfo
          correctAnswerId={bestReply}
          answers={isSearchPage ? [] : answers}
          rating={rating}
          answersCount={replyCount}
          officialAnswersCount={offAnswersCount}
          isSearchPage={isSearchPage}
          isTutorial={postType === POST_TYPE.tutorial}
        />
      )}
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
          ipfsHash={ipfsHash}
          isModerator={isModerator}
          title={title}
          author={{
            ...author,
            handle,
            messengerType,
          }}
          postTime={postTime}
          locale={locale}
          communityId={communityId}
          communities={communities}
          tags={tags}
          isGeneral={isGeneral}
          displayTopQuestionMove={displayTopQuestionMove}
          profileInfo={profileInfo}
          questionBounty={questionBounty}
          isTopQuestion={isTopQuestion}
          topQuestionsCount={topQuestions.length}
          topQuestionActionProcessing={topQuestionActionProcessing}
          isPromoted={isPromoted}
          isSearchPage={isSearchPage}
          postType={postType}
          isFeed={isFeed}
          isExpert={isExpert}
          isCommunityFeed={isCommunityFeed}
          postLanguage={language}
          translations={translations}
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
  (dispatch) => ({
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
  isHomePage = false,
  isSearchPage,
  isFeed,
  isCommunityFeed,
  nextPage,
  prevPage,
  page,
  setPage,
  totalPages,
}) => (
  <div className="position-relative">
    {questionsList.map((item, index) => (
      <QuestionItem
        {...item}
        isGeneral={isGeneralQuestion(item)}
        index={index}
        first={index === 0}
        last={index === questionsList.length - 1}
        locale={locale}
        communities={communities}
        key={item.id}
        isModerator={isModerator}
        profileInfo={profileInfo}
        isHomePage={isHomePage}
        isSearchPage={isSearchPage}
        isFeed={isFeed}
        isCommunityFeed={isCommunityFeed}
      />
    ))}
    <Pagination
      page={page}
      totalPages={totalPages}
      prevPage={prevPage}
      setPage={setPage}
      nextPage={nextPage}
    />
  </div>
);

QI.propTypes = {
  id: PropTypes.string,
  ipfsHash: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  postTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communities: PropTypes.array,
  tags: PropTypes.array,
  rating: PropTypes.number,
  answers: PropTypes.array,
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
  isPromoted: PropTypes.bool,
  questionBounty: PropTypes.number,
  isHomePage: PropTypes.bool,
  isCommunityFeed: PropTypes.bool,
  isFeed: PropTypes.bool,
};

Content.propTypes = {
  questionsList: PropTypes.array,
  promotedQuestionsList: PropTypes.array,
  locale: PropTypes.string,
  communities: PropTypes.array,
  isModerator: PropTypes.bool,
  profileInfo: PropTypes.object,
  isHomePage: PropTypes.bool,
  isCommunityFeed: PropTypes.bool,
  isFeed: PropTypes.bool,
  nextPage: PropTypes.func,
  prevPage: PropTypes.func,
  page: PropTypes.number,
  setPage: PropTypes.func,
  totalPages: PropTypes.number,
};

export { QuestionItem };
export default React.memo(Content);
