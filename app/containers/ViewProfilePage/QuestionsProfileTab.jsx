import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';

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
import Img from 'components/Img/SmallImage';
import A, { ADefault } from 'components/A';
import styled from 'styled-components';

import questionRoundedIcon from 'images/question2.svg?inline';
import answerIcon from 'images/answer.svg?inline';
import bestAnswerIcon from 'images/bestAnswer.svg?inline';

import Banner from './Banner';

import QuestionType from 'containers/Questions/Content/Body/QuestionType';

const single = isSingleCommunityWebsite();

const Rating = Span.extend`
  min-width: 40px;
  padding: 2px 3px;
  font-size: 14px;
  border: 1px solid
    ${(x) => (x.acceptedAnswer ? BORDER_SUCCESS : BORDER_SECONDARY)};

  color: ${(x) => (x.acceptedAnswer ? TEXT_SUCCESS : TEXT_SECONDARY)};
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
`;

const PostTypeIcon = ({ elementType, isMyAnswerAccepted }) => {
  let icon = answerIcon;

  if (elementType === POST_TYPE_QUESTION) icon = questionRoundedIcon;
  if (isMyAnswerAccepted) icon = bestAnswerIcon;

  return <Img src={icon} notRounded alt="icon" />;
};

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
  ...postInfo
}) => {
  let LinkStyled = A;
  let route = routes.questionView(
    id,
    elementType === POST_TYPE_ANSWER ? answerId.split('-')[1] : null,
  );
  if (single && single !== postInfo.communityId) {
    LinkStyled = ADefault;
    route = `${process.env.APP_LOCATION}${route}`;
  }

  return (
    <LinkStyled to={route} href={route}>
      <Block>
        <PostTypeIcon
          elementType={elementType}
          isMyAnswerAccepted={isMyAnswerAccepted}
        />

        <Rating>{myPostRating}</Rating>

        <Span fontSize="16" lineHeight="30" mobileFS="14">
          {title}
        </Span>

        <QuestionType locale={locale} postType={postType} />

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

const QuestionsProfileTab = ({ questions, className, loading, locale }) => (
  <div className={className}>
    <div>
      {questions.map((x) => (
        <Note
          {...x}
          key={`${x.id}_profile_tab_${x.postType}`}
          locale={locale}
        />
      ))}
    </div>

    {loading && <LoadingIndicator inline />}

    {!questions[0] && !loading && <Banner />}
  </div>
);

PostTypeIcon.propTypes = {
  postType: PropTypes.string,
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
};

QuestionsProfileTab.propTypes = {
  questions: PropTypes.array,
  className: PropTypes.string,
  loading: PropTypes.bool,
  locale: PropTypes.string,
};

export default React.memo(QuestionsProfileTab);
