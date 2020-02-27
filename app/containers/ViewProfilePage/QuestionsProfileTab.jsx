import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';

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
import A from 'components/A';

import questionRoundedIcon from 'images/question2.svg?inline';
import answerIcon from 'images/answer.svg?inline';
import bestAnswerIcon from 'images/bestAnswer.svg?inline';

import Banner from './Banner';

const Rating = Span.extend`
  min-width: 40px;
  padding: 2px 3px;
  font-size: 14px;
  border: 1px solid
    ${x => (x.acceptedAnswer ? BORDER_SUCCESS : BORDER_SECONDARY)};

  color: ${x => (x.acceptedAnswer ? TEXT_SUCCESS : TEXT_SECONDARY)};
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  margin: 0 20px;

  @media only screen and (max-width: 576px) {
    margin: 0 15px;
  }
`;

const PostDate = Span.extend`
  white-space: nowrap;
`;

const PostTypeIcon = ({ postType, isMyAnswerAccepted }) => {
  let icon = answerIcon;

  if (postType === POST_TYPE_QUESTION) icon = questionRoundedIcon;
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
}) => (
  <A
    className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center py-1"
    to={routes.questionView(
      id,
      postType === POST_TYPE_ANSWER ? answerId : null,
    )}
  >
    <div className="d-flex align-items-center mb-to-sm-2">
      <PostTypeIcon
        postType={postType}
        isMyAnswerAccepted={isMyAnswerAccepted}
      />

      <Rating acceptedAnswer={acceptedAnswer}>{myPostRating}</Rating>

      <PostDate
        className="d-inline-block d-sm-none"
        color={TEXT_SECONDARY}
        fontSize="14"
        mobileFS="12"
      >
        {getTimeFromDateToNow(myPostTime, locale)}{' '}
        <FormattedMessage {...commonMessages.ago} />
      </PostDate>
    </div>

    <Span
      fontSize="16"
      lineHeight="30"
      mobileFS="14"
      className="flex-grow-1 mb-to-sm-2 mr-3"
    >
      {title}
    </Span>

    <PostDate
      className="d-none d-sm-inline-block"
      color={TEXT_SECONDARY}
      fontSize="14"
      mobileFS="12"
    >
      {getTimeFromDateToNow(myPostTime, locale)}{' '}
      <FormattedMessage {...commonMessages.ago} />
    </PostDate>
  </A>
);

const QuestionsProfileTab = ({ questions, className, loading, locale }) => (
  <div className={className}>
    <div>
      {questions.map(x => (
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
  postType: PropTypes.string,
  isMyAnswerAccepted: PropTypes.bool,
  acceptedAnswer: PropTypes.bool,
  myPostRating: PropTypes.number,
  title: PropTypes.string,
  myPostTime: PropTypes.number,
  locale: PropTypes.string,
  answerId: PropTypes.number,
  id: PropTypes.string,
};

QuestionsProfileTab.propTypes = {
  questions: PropTypes.array,
  className: PropTypes.string,
  loading: PropTypes.bool,
  locale: PropTypes.string,
};

export default React.memo(QuestionsProfileTab);
