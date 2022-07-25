import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import {
  TEXT_SECONDARY,
  BORDER_SUCCESS,
  TEXT_SUCCESS,
  BORDER_SECONDARY,
} from 'style-constants';

import { getTimeFromDateToNow } from 'utils/datetime';
import commonMessages from 'common-messages';

import {
  POST_TYPE_ANSWER,
  POST_TYPE_QUESTION,
} from 'containers/Profile/constants';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import Span from 'components/Span';
import A, { ADefault } from 'components/A';
import styled from 'styled-components';

import AnswerWithAIcon from 'icons/AnswerWithA';
import QuestionIcon from 'icons/Question';
import BestAnswerIcon from 'icons/BestAnswer';

import QuestionType from 'containers/Questions/Content/Body/QuestionType';
import { getPostRoute } from 'routes-config';
import Banner from './Banner';

const single = isSingleCommunityWebsite();

const Rating = Span.extend`
  min-width: 40px;
  padding: 2px 3px;
  font-size: 14px;
  border: 1px solid
    ${({ acceptedAnswer, isMyPost, isMyAnswerAccepted }) =>
      (acceptedAnswer && isMyPost) || isMyAnswerAccepted
        ? BORDER_SUCCESS
        : BORDER_SECONDARY};

  color: ${({ acceptedAnswer, isMyPost, isMyAnswerAccepted }) =>
    (acceptedAnswer && isMyPost) || isMyAnswerAccepted
      ? TEXT_SUCCESS
      : TEXT_SECONDARY};
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  margin: 0 20px;

  @media only screen and (max-width: 576px) {
    margin: 0 15px;
  }
`;

const Block = styled.div`
  display: inline-grid;
  align-items: center;
  grid-template-columns: 0.4fr 1fr 20fr 0.5fr 3fr;
  padding: 4px 0;
`;

const PostDate = Span.extend`
  white-space: nowrap;
  width: 120px;
  text-align: right;

  @media (max-width: 576px) {
    width: 90px;
  }

  @media (max-width: 290px) {
    width: 100px;
  }
`;

const PostTypeIcon = ({ elementType, isMyAnswerAccepted }) => {
  if (isMyAnswerAccepted) return <BestAnswerIcon stroke="#28A745" />;
  if (elementType === POST_TYPE_QUESTION)
    return <QuestionIcon stroke="#354A89" />;
  return <AnswerWithAIcon stroke="#354A89" />;
};

const QuestionTypeHolder = styled.div`
  @media (max-width: 576px) {
    margin-top: -20px;
  }
`;

const TitleHolder = Span.extend`
  @media (max-width: 576px) {
    min-width: 45px;
    margin-right: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 290px) {
    min-width: 35px;
  }
`;

const Note = ({
  postType,
  isMyAnswerAccepted,
  acceptedAnswer,
  myPostRating,
  title,
  myPostTime,
  locale,
  id,
  answerId,
  elementType,
  isMyPost,
  communityId,
}) => {
  const LinkStyled = single && single !== communityId ? ADefault : A;

  const answerRouteId =
    elementType === POST_TYPE_ANSWER ? answerId.split('-')[1] : null;

  const route = getPostRoute(postType, id, answerRouteId);

  return (
    <LinkStyled to={route} href={route}>
      <Block>
        <PostTypeIcon
          elementType={elementType}
          isMyAnswerAccepted={isMyAnswerAccepted}
        />

        <Rating
          acceptedAnswer={acceptedAnswer}
          isMyAnswerAccepted={isMyAnswerAccepted}
          isMyPost={isMyPost}
        >
          {myPostRating}
        </Rating>

        <TitleHolder fontSize="16" lineHeight="30" mobileFS="14" title={title}>
          {title}
        </TitleHolder>
        <QuestionTypeHolder>
          <QuestionType locale={locale} postType={postType} />
        </QuestionTypeHolder>

        <PostDate
          className="d-inline-block"
          color={TEXT_SECONDARY}
          fontSize="14"
          mobileFS="12"
        >
          {getTimeFromDateToNow(myPostTime, locale)}{' '}
          <FormattedMessage id={commonMessages.ago.id} />
        </PostDate>
      </Block>
    </LinkStyled>
  );
};

const QuestionsProfileTab = ({
  questions,
  className,
  loading,
  locale,
  userId,
}) => (
  <div className={className}>
    <div>
      {questions.map(item => (
        <Note
          postType={item.postType}
          isMyAnswerAccepted={item.isMyAnswerAccepted}
          acceptedAnswer={item.acceptedAnswer}
          myPostRating={item.myPostRating}
          title={item.title}
          myPostTime={item.myPostTime}
          id={item.id}
          answerId={item.answerId}
          elementType={item.elementType}
          communityId={item.communityId}
          key={`${item.id}_profile_tab_${item.postType}`}
          locale={locale}
          isMyPost={userId === item.author.id}
        />
      ))}
    </div>

    {loading && <LoadingIndicator inline />}

    {!questions[0] && !loading && <Banner />}
  </div>
);

PostTypeIcon.propTypes = {
  elementType: PropTypes.string,
  isMyAnswerAccepted: PropTypes.bool,
};

Note.propTypes = {
  postType: PropTypes.number,
  isMyAnswerAccepted: PropTypes.bool,
  acceptedAnswer: PropTypes.bool,
  myPostRating: PropTypes.number,
  title: PropTypes.string,
  myPostTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  isMyPost: PropTypes.bool,
  elementType: PropTypes.string,
  communityId: PropTypes.string,
};

QuestionsProfileTab.propTypes = {
  questions: PropTypes.array,
  className: PropTypes.string,
  loading: PropTypes.bool,
  locale: PropTypes.string,
  userId: PropTypes.string,
};

export default React.memo(QuestionsProfileTab);
