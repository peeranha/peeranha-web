import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Base from 'components/Base';
import TopQuestion from './TopQuestion';
import QuestionType from './QuestionType';
import Title from './Title';
import UserInfo from './UserInfo';
import TagsContainer from './TagsContainer';
import IPFSInformation from './IPFSInformation';
import { IconMd } from 'components/Icon/IconWithSizes';
import blockchainLogo from 'images/blockchain-outline-32.svg?external';

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
  ipfsHash,
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
  isGeneral,
  isTopQuestion,
  topQuestionsCount,
  displayTopQuestionMove,
  topQuestionActionProcessing,
  isPromoted,
  isSearchPage,
  postType,
  isFeed,
  isExpert,
  isCommunityFeed,
}) => {
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  return (
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
        {(isFeed || isSearchPage || isCommunityFeed) && (
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
        />

        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="position-relative"
        >
          {visible && <IPFSInformation locale={locale} ipfsHash={ipfsHash} />}
          <IconMd icon={blockchainLogo} />
        </div>
      </div>
    </Base>
  );
};

Body.propTypes = {
  id: PropTypes.string,
  ipfsHash: PropTypes.string,
  author: PropTypes.string,
  title: PropTypes.string,
  postTime: PropTypes.number,
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
};

export default Body;
