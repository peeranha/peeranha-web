import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import { green, gray, darkgray } from 'style-constants';

import { getTimeFromDateToNow } from 'utils/datetime';
import commonMessages from 'common-messages';

import LoadingIndicator from 'components/LoadingIndicator';
import Span from 'components/Span';
import SmallImage from 'components/Img/SmallImage';
import A from 'components/A';

import questionRoundedIcon from 'images/question.png';
import bestAnswerIcon from 'images/ico-best-answer.png';
import answerIcon from 'images/answer.png';

import NoActivity from './NoActivity';

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

const PostTypeIcon = ({ postType, isMyAnswerAccepted }) => {
  if (postType === 'question') {
    return <SmallImage notRounded src={questionRoundedIcon} alt="?" />;
  }

  if (isMyAnswerAccepted) {
    return <SmallImage notRounded src={bestAnswerIcon} alt="v" />;
  }

  return <SmallImage notRounded src={answerIcon} alt="+" />;
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
}) => (
  <li>
    <A
      className="d-flex align-items-center py-1"
      to={routes.question_view(id)}
      href={routes.question_view(id)}
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

const QuestionsProfileTab = ({
  questions,
  className,
  loading,
  tab,
  locale,
}) => (
  <div className={className}>
    <ul>{questions.map(x => <Note {...x} locale={locale} />)}</ul>

    {!questions[0] && loading && <LoadingIndicator />}

    {!questions[0] && !loading && <NoActivity tab={tab} />}
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
  id: PropTypes.string,
};

QuestionsProfileTab.propTypes = {
  questions: PropTypes.array,
  className: PropTypes.string,
  loading: PropTypes.bool,
  tab: PropTypes.string,
  locale: PropTypes.string,
};

export default React.memo(QuestionsProfileTab);
