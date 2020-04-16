import React, { useState } from 'react';
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
  BORDER_SECONDARY,
} from 'style-constants';

import { getFormattedDate } from 'utils/datetime';
import { getFormattedNum, getFormattedNum2 } from 'utils/numbers';
import {
  isSingleCommunityWebsite,
  singleCommunityFonts,
} from 'utils/communityManagement';
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
import QuestionType from 'components/Labels/QuestionType';
import ExpertPopover from './ExpertPopover';

const fonts = singleCommunityFonts();

const AdditionalInfo = Base.extend`
  display: flex;
  justify-content: center;
  flex: 1;
  width: 120px;

  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 1px solid ${BORDER_SECONDARY};
  &:not(:last-child) {
    border-top-left-radius: 5px;
    border-bottom: 1px solid ${BORDER_SECONDARY};
  }

  @media only screen and (max-width: 576px) {
    width: auto;

    border-bottom: 1px solid ${BORDER_SECONDARY};
    &:not(:last-child) {
      border-right: 1px solid ${BORDER_SECONDARY};
    }
  }

  background: ${x => (x.isAccepted ? BG_SUCCESS_LIGHT : BG_TRANSPARENT)};
`;

const Box = BaseNoPadding.extend`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 15px;
  flex-direction: row;
  position: relative;

  @media only screen and (max-width: 575px) {
    flex-direction: column;
  }
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
  isGeneral,
}) => {
  const [isExpertPopoverVisible, toggleExpertPopover] = useState(false);
  const singleCommunityId = isSingleCommunityWebsite();

  return (
    <Box bordered={!isGeneral}>
      <div className="d-flex flex-row flex-sm-column flex-grow-1 flex-sm-grow-0">
        <AdditionalInfo isAccepted={correct_answer_id}>
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

        <AdditionalInfo>
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
      </div>

      <Base>
        {!isGeneral && (
          <QuestionType
            onMouseEnter={() => toggleExpertPopover(true)}
            onMouseLeave={() => toggleExpertPopover(false)}
            size="sm"
          >
            {isExpertPopoverVisible && <ExpertPopover locale={locale} />}
            <FormattedMessage {...commonMessages.expert} />
          </QuestionType>
        )}
        <p className="mb-1">
          <A to={routes.questionView(id, null)}>
            <Span
              fontSize="24"
              lineHeight="31"
              mobileFS="18"
              mobileLH="21"
              letterSpacing={fonts.questionTitleLetterSpacing}
              fontFamily={fonts.questionTitleFont}
              bold
            >
              {title}
            </Span>
          </A>
        </p>
        <p className="mb-3">
          <A
            to={routes.profileView(user)}
            className="d-inline-flex align-items-center"
          >
            <Span className="mr-2" fontSize="14">
              {userInfo.display_name}
            </Span>
            <RatingStatus rating={userInfo.rating} size="sm" isRankOff />
            <Span
              className="text-capitalize mr-3"
              fontSize="14"
              color={TEXT_SECONDARY}
            >
              {getFormattedDate(post_time, locale, MONTH_3LETTERS__DAY_TIME)}
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
            {!singleCommunityId ? (
              <QuestionCommunity
                className="my-1"
                communities={communities}
                communityId={community_id}
              />
            ) : null}
          </Tags>
        </div>
      </Base>
    </Box>
  );
};

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
  isGeneral: PropTypes.bool,
};

Content.propTypes = {
  questionsList: PropTypes.array,
  locale: PropTypes.string,
  communities: PropTypes.array,
};

export { QuestionItem };
export default React.memo(Content);
