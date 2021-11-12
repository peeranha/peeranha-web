import React, { memo } from 'react';
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
  top: 5px;
  right: 7px;
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
  author,
  isModerator,
  title,
  userInfo,
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
}) => {
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

        <QuestionType
          locale={locale}
          isGeneral={isGeneral}
          isPromoted={isPromoted}
        />
      </QuestionLabels>

      <Title
        locale={locale}
        title={title}
        id={id}
        questionBounty={questionBounty}
      />

      <UserInfo
        author={author}
        userInfo={userInfo}
        locale={locale}
        postTime={postTime}
      />

      <TagsContainer
        communities={communities}
        communityId={communityId}
        tags={tags}
      />
    </Base>
  );
};

Body.propTypes = {
  id: PropTypes.string,
  author: PropTypes.string,
  title: PropTypes.string,
  userInfo: PropTypes.object,
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
};

export default memo(Body);
