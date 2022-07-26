import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Base from 'components/Base';
import TopQuestion from './TopQuestion';
import QuestionType from './QuestionType';
import Title from './Title';
import UserInfo from './UserInfo';
import TagsContainer from './TagsContainer';

const QuestionLabels = styled.div`
  position: absolute;
  top: 32px;
  right: 20px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  @media only screen and (max-width: 576px) {
    top: 50px;
    right: 3px;
  }
`;

const Body = ({
  id,
  isModerator,
  title,
  author,
  postTime,
  locale,
  communityId,
  communities,
  tags,
  profileInfo,
  questionBounty,
  isTopQuestion,
  topQuestionsCount,
  displayTopQuestionMove,
  topQuestionActionProcessing,
  isPromoted,
  isSearchPage,
  postType,
  isFeed,
  isExpert,
}) => (
  <Base
    className={displayTopQuestionMove ? 'pl-0' : ''}
    position="right"
    paddingTopMedia={20}
  >
    <QuestionLabels>
      <TopQuestion
        id={id}
        locale={locale}
        profileInfo={profileInfo}
        isTopQuestion={isTopQuestion}
        isModerator={isModerator}
        topQuestionsCount={topQuestionsCount}
        topQuestionActionProcessing={topQuestionActionProcessing}
      />
      {(isFeed || isSearchPage) && (
        <QuestionType
          locale={locale}
          postType={postType}
          isPromoted={isPromoted}
          isExpert={isExpert}
        />
      )}
    </QuestionLabels>

    <Title
      locale={locale}
      title={title}
      id={id}
      questionBounty={questionBounty}
      postType={postType}
    />

    <UserInfo
      author={author}
      locale={locale}
      postTime={postTime}
      isSearchPage={isSearchPage}
      communityId={communityId}
    />

    <div className="d-flex justify-content-between align-items-center">
      <TagsContainer
        communities={communities}
        communityId={communityId}
        tags={tags}
        postType={postType}
        isFeed={isFeed}
      />
    </div>
  </Base>
);

Body.propTypes = {
  id: PropTypes.string,
  ipfsHash: PropTypes.string,
  author: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
  postTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communities: PropTypes.array,
  tags: PropTypes.array,
  profileInfo: PropTypes.object,
  questionBounty: PropTypes.object,
  isGeneral: PropTypes.bool,
  isModerator: PropTypes.bool,
  isTopQuestion: PropTypes.bool,
  topQuestionsCount: PropTypes.number,
  displayTopQuestionMove: PropTypes.bool,
  topQuestionActionProcessing: PropTypes.bool,
  isPromoted: PropTypes.bool,
  isCommunityFeed: PropTypes.bool,
  postType: PropTypes.number,
  isFeed: PropTypes.bool,
};

export default Body;
