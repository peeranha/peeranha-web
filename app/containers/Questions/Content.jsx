import React, { useState, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import commonMessages from 'common-messages';
import * as routes from 'routes-config';

import {
  TEXT_PRIMARY_DARK,
  TEXT_SUCCESS,
  BG_TRANSPARENT,
  TEXT_SECONDARY,
  BG_SUCCESS_LIGHT,
  BORDER_SECONDARY,
  APP_FONT,
} from 'style-constants';

import { getFormattedDate } from 'utils/datetime';
import { getFormattedNum, getFormattedNum2 } from 'utils/numbers';
import {
  isSingleCommunityWebsite,
  singleCommunityFonts,
} from 'utils/communityManagement';
import { MONTH_3LETTERS__DAY_TIME } from 'utils/constants';

import topQuestionActiveIcon from 'images/starActive.svg?inline';
import topQuestionsInactiveIcon from 'images/star.svg?inline';
import arrowDownIcon from 'images/arrowDownCircleTwo.svg?inline';

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
import {
  addToTopQuestions,
  downQuestion,
  moveQuestion,
  removeFromTopQuestions,
  upQuestion,
} from './actions';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';
import * as questionsSelector from './selectors';

const single = isSingleCommunityWebsite();
const fonts = singleCommunityFonts();

const AdditionalInfo = Base.extend`
  display: flex;
  justify-content: center;
  flex: 1;
  width: 120px;
  padding: 0;
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
  transition: none;
`;

const Button = styled.button`
  position: relative;
  float: right;
  top: -15px;
  right: -25px;
  cursor: pointer;

  @media only screen and (max-width: 576px) {
    top: -10px;
    right: -10px;
  }
`;

const Div = styled.div`
  padding: 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  > div {
    height: 50%;
    display: flex;
    align-items: center;

    > button img {
      width: 20px;
    }
  }

  > div:nth-child(1) button img {
    transform: rotate(180deg);
  }
`;

/* eslint camelcase: 0 */
const QI = ({
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
  first,
  last,
  index,
  isTopQuestion,
  profileInfo,
  questionFilter,
  addToTopQuestionsDispatch,
  removeFromTopQuestionsDispatch,
  upQuestionDispatch,
  downQuestionDispatch,
  pinActionProcessing,
  moveQuestionDispatch,
}) => {
  const [isExpertPopoverVisible, toggleExpertPopover] = useState(false);
  const ref = useRef(null);

  const changePinType = useCallback(
    () => {
      if (isTopQuestion) {
        removeFromTopQuestionsDispatch(id);
      } else {
        addToTopQuestionsDispatch(id);
      }
    },
    [id, isTopQuestion],
  );

  const pinIcon = useMemo(
    () => {
      if (isTopQuestion) {
        return topQuestionActiveIcon;
      } else if (profileInfo && profileInfo.isAdmin) {
        return topQuestionsInactiveIcon;
      }

      return undefined;
    },
    [isTopQuestion, profileInfo],
  );

  const displayPin = useMemo(() => !!profileInfo && profileInfo.isAdmin, [
    profileInfo,
  ]);

  const displayPinMove = useMemo(
    () => displayPin && isTopQuestion && questionFilter === 1,
    [isTopQuestion, displayPin, questionFilter],
  );

  const upQuestionMethod = useCallback(
    () => {
      upQuestionDispatch(id);
    },
    [id],
  );

  const downQuestionMethod = useCallback(
    () => {
      downQuestionDispatch(id);
    },
    [id],
  );

  const onDragStart = useCallback(
    e => {
      e.dataTransfer.setData('id', id);
    },
    [index, id],
  );

  const onDrop = useCallback(
    e => {
      const data = e.dataTransfer.getData('id');

      if (data !== id) {
        moveQuestionDispatch(data, index);
      }

      e.dataTransfer.clearData();
      e.preventDefault();
    },
    [index, id],
  );

  const onDragOver = useCallback(e => {
    e.preventDefault();
  }, []);

  return (
    <Box
      innerRef={ref}
      bordered={!isGeneral}
      index={index}
      draggable={profileInfo && profileInfo.isAdmin && questionFilter === 1}
      onDrop={onDrop}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      <div className="d-flex flex-row flex-sm-column flex-grow-1 flex-sm-grow-0">
        <AdditionalInfo isAccepted={correct_answer_id}>
          <span className="d-flex align-items-center justify-content-center">
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
          <span className="d-flex align-items-center justify-content-center">
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
      {displayPinMove && (
        <Div first={first} last={last}>
          <div className="">
            {!first && (
              <button disabled={pinActionProcessing} onClick={upQuestionMethod}>
                <img src={arrowDownIcon} alt="up" />
              </button>
            )}
          </div>
          <div className="">
            {!last && (
              <button
                disabled={pinActionProcessing}
                onClick={downQuestionMethod}
              >
                <img src={arrowDownIcon} alt="down" />
              </button>
            )}
          </div>
        </Div>
      )}
      <Base
        className={displayPinMove ? 'pl-0' : ''}
        bottomRightRadius
        topRightRadius
      >
        {!!pinIcon && (
          <Button
            className="ml-2"
            onClick={changePinType}
            disabled={pinActionProcessing}
          >
            <img src={pinIcon} width="20" alt="top" />
          </Button>
        )}

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
              fontFamily={fonts.questionTitleFont || APP_FONT}
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
            {!single ? (
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

const QuestionItem = connect(
  state => ({
    profileInfo: makeSelectProfileInfo()(state),
    questionFilter: questionsSelector.selectQuestionFilter()(state),
    pinActionProcessing: questionsSelector.selectTopQuestionActionProcessing()(
      state,
    ),
  }),
  dispatch => ({
    addToTopQuestionsDispatch: bindActionCreators(addToTopQuestions, dispatch),
    removeFromTopQuestionsDispatch: bindActionCreators(
      removeFromTopQuestions,
      dispatch,
    ),
    upQuestionDispatch: bindActionCreators(upQuestion, dispatch),
    downQuestionDispatch: bindActionCreators(downQuestion, dispatch),
    moveQuestionDispatch: bindActionCreators(moveQuestion, dispatch),
  }),
)(QI);

export const Content = ({ questionsList, locale, communities }) => (
  <div className="position-relative">
    {questionsList.map((item, index) => (
      <QuestionItem
        {...item}
        index={index}
        first={index === 0}
        last={index === questionsList.length - 1}
        locale={locale}
        communities={communities}
        key={item.id}
      />
    ))}
  </div>
);

QI.propTypes = {
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
  first: PropTypes.bool,
  last: PropTypes.bool,
  index: PropTypes.number,
  isTopQuestion: PropTypes.bool,
  addToTopQuestionsDispatch: PropTypes.func,
  removeFromTopQuestionsDispatch: PropTypes.func,
  profileInfo: PropTypes.object,
  questionFilter: PropTypes.number,
  upQuestionDispatch: PropTypes.func,
  downQuestionDispatch: PropTypes.func,
  pinActionProcessing: PropTypes.bool,
  moveQuestionDispatch: PropTypes.bool,
};

Content.propTypes = {
  questionsList: PropTypes.array,
  locale: PropTypes.string,
  communities: PropTypes.array,
};

export { QuestionItem };
export default React.memo(Content);
