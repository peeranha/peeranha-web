import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import styled from 'styled-components';
import { green, gray, darkgray } from 'style-constants';

import { getTimeFromDateToNow } from 'utils/datetime';
import commonMessages from 'common-messages';

import LoadingIndicator from 'components/LoadingIndicator';
import Span from 'components/Span';

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

const Img = styled.img`
  width: 18px;
`;

const PostTypeIcon = ({ postType, isMyAnswerAccepted }) => {
  if (postType === 'question') {
    return <Img src={questionRoundedIcon} alt="?" />;
  }

  if (isMyAnswerAccepted) {
    return <Img src={bestAnswerIcon} alt="v" />;
  }

  return <Img src={answerIcon} alt="+" />;
};

const Note = ({
  postType,
  isMyAnswerAccepted,
  acceptedAnswer,
  rating,
  title,
  myPostTime,
  locale,
}) => (
  <li className="d-flex align-items-center py-1">
    <PostTypeIcon postType={postType} isMyAnswerAccepted={isMyAnswerAccepted} />
    <Rating acceptedAnswer={acceptedAnswer}>{rating}</Rating>
    <Span className="flex-grow-1">{title}</Span>
    <Span fontSize="14" color="gray">
      {getTimeFromDateToNow(myPostTime, locale)}{' '}
      <FormattedMessage {...commonMessages.ago} />
    </Span>
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

    {loading && <LoadingIndicator />}

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
  rating: PropTypes.number,
  title: PropTypes.string,
  myPostTime: PropTypes.number,
  locale: PropTypes.string,
};

QuestionsProfileTab.propTypes = {
  questions: PropTypes.array,
  className: PropTypes.string,
  loading: PropTypes.bool,
  tab: PropTypes.string,
  locale: PropTypes.string,
};

export default React.memo(QuestionsProfileTab);
