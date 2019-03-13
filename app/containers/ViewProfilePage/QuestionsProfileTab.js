import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import { green, gray, darkgray } from 'style-constants';

import { getTimeFromDateToNow } from 'utils/datetime';
import commonMessages from 'common-messages';

import {
  POST_TYPE_ANSWER,
  POST_TYPE_QUESTION,
} from 'containers/Profile/constants';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import Span from 'components/Span';
import Icon from 'components/Icon';
import A from 'components/A';

import questionRoundedIcon from 'svg/question2';
import answerIcon from 'svg/answer';
import bestAnswerIcon from 'svg/bestAnswer';

import NoActivity from './NoActivity';

/* istanbul ignore next */
const Rating = Span.extend`
  min-width: 40px;
  padding: 2px 3px;
  font-size: 14px;
  border: 1px solid ${props => (props.acceptedAnswer ? green : gray)};
  color: ${props => (props.acceptedAnswer ? green : darkgray)};
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  margin: 0 20px;
`;

const PostDate = Span.extend`
  white-space: nowrap;
`;

const PostTypeIcon = /* istanbul ignore next */ ({
  postType,
  isMyAnswerAccepted,
}) => {
  if (postType === POST_TYPE_QUESTION) {
    return (
      <Icon
        icon={questionRoundedIcon}
        className="d-flex align-items-center mr-0"
      />
    );
  }

  if (isMyAnswerAccepted) {
    return (
      <Icon icon={bestAnswerIcon} className="d-flex align-items-center mr-0" />
    );
  }

  return <Icon icon={answerIcon} className="d-flex align-items-center mr-0" />;
};

const Note = /* istanbul ignore next */ ({
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
  <li>
    <A
      className="d-flex align-items-center py-1"
      to={routes.questionView(
        id,
        postType === POST_TYPE_ANSWER ? answerId : null,
      )}
      href={routes.questionView(
        id,
        postType === POST_TYPE_ANSWER ? answerId : null,
      )}
    >
      <PostTypeIcon
        postType={postType}
        isMyAnswerAccepted={isMyAnswerAccepted}
      />
      <Rating acceptedAnswer={acceptedAnswer}>{myPostRating}</Rating>
      <Span className="flex-grow-1">{title}</Span>
      <PostDate fontSize="14" color="gray">
        {getTimeFromDateToNow(myPostTime, locale)}{' '}
        <FormattedMessage {...commonMessages.ago} />
      </PostDate>
    </A>
  </li>
);

const QuestionsProfileTab = /* istanbul ignore next */ ({
  questions,
  className,
  loading,
  locale,
}) => (
  <div className={className}>
    <ul>
      {questions.map(x => (
        <Note
          {...x}
          key={`${x.id}_profile_tab_${x.postType}`}
          locale={locale}
        />
      ))}
    </ul>

    {!questions[0] && loading && <LoadingIndicator />}

    {!questions[0] && !loading && <NoActivity />}
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
