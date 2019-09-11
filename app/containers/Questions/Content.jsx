import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';
import * as routes from 'routes-config';

import {
  TEXT_PRIMARY_DARK,
  TEXT_SUCCESS,
  BG_TRANSPARENT,
  TEXT_SECONDARY,
  BG_SUCCESS_LIGHT,
} from 'style-constants';

import { getFormattedDate } from 'utils/datetime';
import { getFormattedNum, getFormattedNum2 } from 'utils/numbers';
import { MONTH_3LETTERS__DAY_TIME } from 'utils/constants';

import Tags from 'components/TagsList';
import Base from 'components/Base';
import BaseNoPadding from 'components/Base/BaseRoundedNoPadding';
import Span from 'components/Span';
import A from 'components/A';
import RatingStatus from 'components/RatingStatus';
import QuestionCommunity from 'components/QuestionForProfilePage/QuestionCommunity';

import answerIconEmptyInside from 'images/answerIconEmptyInside.svg?inline';
import bestAnswerIcon from 'images/bestAnswer.svg?inline';
import fingerDownAllQuestionsPage from 'images/fingerDownAllQuestionsPage.svg?inline';
import fingerUpAllQuestionsPage from 'images/fingerUpAllQuestionsPage.svg?inline';

const AdditionalInfo = Base.extend`
  border-bottom: 1px solid #00000013;
  border-right: 1px solid #00000013;
  display: flex;
  justify-content: center;

  background: ${x => (x.isAccepted ? BG_SUCCESS_LIGHT : BG_TRANSPARENT)};
`;

/* eslint camelcase: 0 */
const QuestionItem = ({
  id,
  title,
  user,
  userInfo,
  post_time,
  locale,
  community_id,
  communities,
  tags,
  rating,
  answers,
  correct_answer_id,
}) => (
  <BaseNoPadding className="d-flex flex-wrap mt-3" overflowHidden>
    <Base className="d-flex flex-wrap col-12 col-sm-3 col-md-2 p-0">
      <AdditionalInfo
        className="col-6 col-sm-12"
        isAccepted={correct_answer_id}
      >
        <span className="d-flex align-items-center">
          <img
            className="mr-2"
            src={correct_answer_id ? bestAnswerIcon : answerIconEmptyInside}
            alt="icon"
          />
          <Span
            color={correct_answer_id ? TEXT_SUCCESS : TEXT_PRIMARY_DARK}
            bold
          >
            {getFormattedNum(answers.length)}
          </Span>
        </span>
      </AdditionalInfo>

      <AdditionalInfo className="col-6 col-sm-12">
        <span className="d-flex align-items-center">
          <img
            className="mr-2"
            src={
              rating >= 0
                ? fingerUpAllQuestionsPage
                : fingerDownAllQuestionsPage
            }
            alt="icon"
          />
          <Span color={TEXT_PRIMARY_DARK} bold>
            {getFormattedNum2(rating)}
          </Span>
        </span>
      </AdditionalInfo>
    </Base>

    <Base className="col-12 col-sm-9 col-md-10">
      <p className="mb-1">
        <A to={routes.questionView(id)} href={routes.questionView(id)}>
          <Span fontSize="24" mobileFS="18" bold>
            {title}
          </Span>
        </A>
      </p>
      <p className="mb-2">
        <A to={routes.profileView(user)} className="d-flex align-items-center">
          <Span className="mr-2" fontSize="14">
            {userInfo.display_name}
          </Span>
          <RatingStatus rating={userInfo.rating} size="sm" isRankOff />
          <Span
            className="text-capitalize mr-3"
            fontSize="14"
            color={TEXT_SECONDARY}
          >
            <FormattedMessage {...commonMessages.asked} />
            <span className="pl-1">
              {getFormattedDate(post_time, locale, MONTH_3LETTERS__DAY_TIME)}
            </span>
          </Span>
        </A>
      </p>
      <div className="d-flex align-items-center flex-wrap">
        <Tags
          className="my-1"
          chosenTags={tags}
          communityId={community_id}
          communities={communities}
        >
          <QuestionCommunity
            className="my-1"
            communities={communities}
            communityId={community_id}
          />
        </Tags>
      </div>
    </Base>
  </BaseNoPadding>
);

export const Content = ({ questionsList, locale, communities }) => (
  <div>
    {questionsList.map(item => (
      <QuestionItem
        {...item}
        locale={locale}
        communities={communities}
        key={item.id}
      />
    ))}
  </div>
);

QuestionItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  user: PropTypes.string,
  userInfo: PropTypes.object,
  post_time: PropTypes.number,
  locale: PropTypes.string,
  community_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communities: PropTypes.array,
  tags: PropTypes.array,
  rating: PropTypes.number,
  answers: PropTypes.array,
  correct_answer_id: PropTypes.number,
};

Content.propTypes = {
  questionsList: PropTypes.array,
  locale: PropTypes.string,
  communities: PropTypes.array,
};

export { QuestionItem };
export default React.memo(Content);
