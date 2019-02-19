import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { darkblue, green } from 'style-constants';
import * as routes from 'routes-config';

import { getFormattedDate } from 'utils/datetime';
import { getFollowedCommunities } from 'utils/communityManagement';
import {
  MONTH_3LETTERS__DAY_TIME,
  MONTH_3LETTERS__DAY_YYYY_TIME,
} from 'utils/constants';

import okayIcon from 'svg/okay';
import answerIcon from 'images/ico-answer.png';

import Base from 'components/Base';
import Span from 'components/Span';
import Icon from 'components/Icon';
import A from 'components/A';
import RatingStatus from 'components/RatingStatus';
import Img from 'components/Img';

import messages from 'containers/Profile/messages';

const BaseStyled = Base.extend`
  margin-top: 15px;
  word-break: break-all;
`;

const RightBlock = BaseStyled.extend`
  padding-left: 20px;
  min-width: 240px;
`;

const Badge = Span.extend`
  color: ${darkblue};
  display: inline-block;
  border: 1px solid ${darkblue};
  border-radius: 3px;
  padding: 4px 10px;
  text-align: center;
  min-width: 56px;
  margin-bottom: 8px;
`;

const AcceptedQuestionBadge = Badge.extend`
  background: ${green};
  border: none;
`;

const QuestionCommunity = ({ communities, communityId }) => {
  if (!communities[0]) {
    return null;
  }

  const com = getFollowedCommunities(communities, [communityId])[0];

  return (
    <Span className="d-flex align-items-center" fontSize="14">
      <Img className="mr-1" src={com.avatar} alt="comm_avatar" />
      <span>{com.name}</span>
    </Span>
  );
};

const LastAnswer = ({ lastAnswer, locale }) => {
  if (!lastAnswer) {
    return (
      <Span fontSize="14" color="gray">
        <FormattedMessage {...messages.noAnswersYet} />
      </Span>
    );
  }

  return (
    <span className="d-flex flex-column">
      <span className="d-flex align-items-center">
        <Span className="mr-2" fontSize="14">
          {lastAnswer.userInfo.display_name}
        </Span>
        <RatingStatus rating={lastAnswer.userInfo.rating} size="sm" isRankOff />
      </span>

      <Span fontSize="14" color="gray">
        <FormattedMessage {...messages.lastAnswer} />{' '}
        {getFormattedDate(
          lastAnswer.post_time,
          locale,
          MONTH_3LETTERS__DAY_YYYY_TIME,
        )}
      </Span>
    </span>
  );
};

/* eslint camelcase: 0 */
const Question = ({
  myPostRating,
  title,
  myPostTime,
  answers,
  locale,
  acceptedAnswer,
  communities,
  id,
  community_id,
}) => (
  <li className="d-flex">
    <BaseStyled className="d-flex flex-grow-1" position="left">
      <div className="d-flex flex-column mr-4">
        <Badge bold>{myPostRating}</Badge>

        {acceptedAnswer && (
          <AcceptedQuestionBadge>
            <Icon icon={okayIcon} noMargin />
          </AcceptedQuestionBadge>
        )}
      </div>

      <div className="d-flex flex-column flex-grow-1">
        <p>
          <A to={routes.question_view(id)} href={routes.question_view(id)}>
            <Span fontSize="24" bold>
              {title}
            </Span>
          </A>
        </p>
        <p className="d-flex align-items-center my-1">
          <Span className="text-capitalize mr-3" fontSize="14" color="gray">
            <FormattedMessage {...messages.asked} />
            <span className="pl-1">
              {getFormattedDate(myPostTime, locale, MONTH_3LETTERS__DAY_TIME)}
            </span>
          </Span>
          <QuestionCommunity
            communities={communities}
            communityId={community_id}
          />
        </p>
      </div>
    </BaseStyled>
    <RightBlock
      className="d-flex flex-column align-items-start"
      position="right"
    >
      <span className="d-flex align-items-center mb-2">
        <img className="mr-2" src={answerIcon} alt="☖" />
        <Span color="darkblue" bold>
          {answers.length}
        </Span>
      </span>

      <LastAnswer lastAnswer={answers[answers.length - 1]} locale={locale} />
    </RightBlock>
  </li>
);

const QuestionsList = ({ questions, locale, communities }) => (
  <div>
    <ul>
      {questions.map(x => (
        <Question {...x} locale={locale} communities={communities} key={x.id} />
      ))}
    </ul>
  </div>
);

QuestionCommunity.propTypes = {
  communities: PropTypes.array,
  communityId: PropTypes.string,
};

LastAnswer.propTypes = {
  lastAnswer: PropTypes.object,
  locale: PropTypes.string,
};

Question.propTypes = {
  myPostRating: PropTypes.string,
  title: PropTypes.string,
  myPostTime: PropTypes.number,
  answers: PropTypes.array,
  locale: PropTypes.string,
  acceptedAnswer: PropTypes.bool,
  communities: PropTypes.array,
  id: PropTypes.string,
  community_id: PropTypes.string,
};

QuestionsList.propTypes = {
  questions: PropTypes.array,
  communities: PropTypes.array,
  locale: PropTypes.string,
};

export default QuestionsList;
