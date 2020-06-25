import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Base from 'components/Base';

import TopQuestion from './TopQuestion';
import QuestionType from './QuestionType';
import Title from './Title';
import UserInfo from './UserInfo';
import TagsContainer from './TagsContainer';

const Body = ({
  id,
  user,
  isModerator,
  title,
  userInfo,
  postTime,
  locale,
  communityId,
  communities,
  tags,
  profileInfo,
  isGeneral,
  isTopQuestion,
  topQuestionsCount,
  displayTopQuestionMove,
  topQuestionActionProcessing,
  addToTopQuestionsDispatch,
  removeFromTopQuestionsDispatch,
}) => (
  <Base
    className={displayTopQuestionMove ? 'pl-0' : ''}
    position='right'
  >
    <TopQuestion
      id={id}
      locale={locale}
      profileInfo={profileInfo}
      isTopQuestion={isTopQuestion}
      isModerator={isModerator}
      topQuestionsCount={topQuestionsCount}
      topQuestionActionProcessing={topQuestionActionProcessing}
      addToTopQuestionsDispatch={addToTopQuestionsDispatch}
      removeFromTopQuestionsDispatch={removeFromTopQuestionsDispatch}
    />

    <QuestionType locale={locale} isGeneral={isGeneral} />

    <Title title={title} id={id} />

    <UserInfo
      user={user}
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

Body.propTypes = {
  id: PropTypes.string,
  user: PropTypes.string,
  title: PropTypes.string,
  userInfo: PropTypes.object,
  postTime: PropTypes.number,
  locale: PropTypes.string,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communities: PropTypes.array,
  tags: PropTypes.array,
  profileInfo: PropTypes.object,
  isGeneral: PropTypes.bool,
  isModerator: PropTypes.bool,
  isTopQuestion: PropTypes.bool,
  topQuestionsCount: PropTypes.number,
  displayTopQuestionMove: PropTypes.bool,
  topQuestionActionProcessing: PropTypes.bool,
  addToTopQuestionsDispatch: PropTypes.func,
  removeFromTopQuestionsDispatch: PropTypes.func,
};

export default memo(Body);
