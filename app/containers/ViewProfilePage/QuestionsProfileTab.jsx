/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getPostRoute } from 'routes-config';
import communitiesConfig from 'communities-config';
import styled from 'styled-components';

import { TEXT_SECONDARY, BORDER_SUCCESS, TEXT_SUCCESS, BORDER_SECONDARY } from 'style-constants';
import questionRoundedIcon from 'images/question2.svg?inline';
import answerIcon from 'images/answer.svg?inline';
import bestAnswerIcon from 'images/bestAnswer.svg?inline';

import { getTimeFromDateToNow } from 'utils/datetime';
import { isSingleCommunityWebsite, graphCommunityColors } from 'utils/communityManagement';

import { POST_TYPE_ANSWER, POST_TYPE_QUESTION } from 'containers/Profile/constants';
import QuestionType from 'containers/Questions/Content/Body/QuestionType';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import Span from 'components/Span';
import Img from 'components/Img/SmallImage';
import A, { ADefault } from 'components/A';
import { QuestionGraph, TheBestGraph, ChatTextGraph } from 'components/icons';

import Banner from './Banner';

const single = isSingleCommunityWebsite();
const graphCommunity = graphCommunityColors();

const Rating = Span.extend`
  min-width: 40px;
  padding: 2px 3px;
  font-size: 14px;
  border: 1px solid
    ${({ acceptedAnswer, isMyPost, isMyAnswerAccepted }) =>
      (acceptedAnswer && isMyPost) || isMyAnswerAccepted
        ? graphCommunity
          ? '#4BCA81'
          : BORDER_SUCCESS
        : BORDER_SECONDARY};

  color: ${({ acceptedAnswer, isMyPost, isMyAnswerAccepted }) =>
    (acceptedAnswer && isMyPost) || isMyAnswerAccepted
      ? graphCommunity
        ? '#4BCA81'
        : TEXT_SUCCESS
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
  let icon = answerIcon;
  let graphIcon = <ChatTextGraph size={[28, 28]} fill="#6F4CFF" />;
  if (elementType === POST_TYPE_QUESTION) {
    icon = questionRoundedIcon;
    graphIcon = <QuestionGraph size={[28, 28]} fill="#6F4CFF" />;
  }
  if (isMyAnswerAccepted) {
    icon = bestAnswerIcon;
    graphIcon = <TheBestGraph size={[28, 28]} fill="#4BCA81" />;
  }

  return graphCommunity ? graphIcon : <Img src={icon} notRounded alt="icon" />;
};

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
  const { t } = useTranslation();
  const LinkStyled = single && single !== communityId ? ADefault : A;
  const answerRouteId = elementType === POST_TYPE_ANSWER ? answerId.split('-')[2] : null;

  const route =
    single && single !== communityId
      ? communitiesConfig[communityId]?.origin +
        getPostRoute({ postType, id, answerId: answerRouteId, title })
      : getPostRoute({ postType, id, answerId: answerRouteId, title });

  return (
    <LinkStyled to={route} href={route}>
      <Block>
        <PostTypeIcon elementType={elementType} isMyAnswerAccepted={isMyAnswerAccepted} />

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
        <div>
          <QuestionType locale={locale} postType={postType} />
        </div>

        <PostDate
          className="d-inline-block"
          color={TEXT_SECONDARY}
          fontSize="14"
          mobileFS="12"
          css={graphCommunity && { color: '#A7A7AD' }}
        >
          {getTimeFromDateToNow(myPostTime, locale)} {t('common.ago')}
        </PostDate>
      </Block>
    </LinkStyled>
  );
};

const QuestionsProfileTab = ({ questions, className, loading, locale, userId }) => (
  <div className={className}>
    <div>
      {questions.map((item) => (
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
