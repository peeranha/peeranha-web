import React, { memo, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import commonMessages from 'common-messages';
import * as routes from 'routes-config';

import { TEXT_SECONDARY, APP_FONT } from 'style-constants';

import { getFormattedDate } from 'utils/datetime';
import {
  isSingleCommunityWebsite,
  singleCommunityFonts,
} from 'utils/communityManagement';
import { MONTH_3LETTERS__DAY_TIME } from 'utils/constants';

import Tags from 'components/TagsList';
import Base from 'components/Base';
import Span from 'components/Span';
import A from 'components/A';
import RatingStatus from 'components/RatingStatus';
import QuestionCommunity from 'components/QuestionForProfilePage/QuestionCommunity';
import QuestionType from 'components/Labels/QuestionType';

import topQuestionActiveIcon from 'images/starActive.svg?inline';
import topQuestionsInactiveIcon from 'images/star.svg?inline';

import ExpertPopover from '../ExpertPopover';
import TopQuestionPopover from '../TopQuestionPopover';

const single = isSingleCommunityWebsite();
const fonts = singleCommunityFonts();

const Container = Base.extend``;

const Button = styled.button`
  position: relative;
  float: right;
  top: -15px;
  right: -25px;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')} !important;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  @media only screen and (max-width: 576px) {
    top: -10px;
    right: -10px;
  }
`;

/* eslint camelcase: 0 */
const Body = ({
  id,
  user,
  displayPin,
  title,
  userInfo,
  postTime,
  locale,
  communityId,
  communities,
  tags,
  profileInfo,
  isGeneral,
  isTopQuestion,
  displayPinMove,
  topQuestionActionProcessing,
  addToTopQuestionsDispatch,
  removeFromTopQuestionsDispatch,
}) => {
  const [isExpertPopoverVisible, toggleExpertPopover] = useState(false);
  const [isTopQuestionPopoverVisible, toggleTopQuestionPopover] = useState(
    false,
  );
  const expertPopoverOnMouseEnter = useCallback(
    () => toggleExpertPopover(true),
    [],
  );
  const expertPopoverOnMouseLeave = useCallback(
    () => toggleExpertPopover(false),
    [],
  );
  const topQuestionPopoverOnMouseEnter = useCallback(
    () => toggleTopQuestionPopover(true),
    [],
  );
  const topQuestionOnMouseLeave = useCallback(
    () => toggleTopQuestionPopover(false),
    [],
  );

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

  return (
    <Container
      className={displayPinMove ? 'pl-0' : ''}
      bottomRightRadius
      topRightRadius
    >
      {!!pinIcon && (
        <Button
          className="ml-2"
          active={displayPin}
          onClick={displayPin ? changePinType : null}
          disabled={topQuestionActionProcessing}
          onMouseEnter={!displayPin ? topQuestionPopoverOnMouseEnter : null}
          onMouseLeave={!displayPin ? topQuestionOnMouseLeave : null}
        >
          {isTopQuestionPopoverVisible && (
            <TopQuestionPopover locale={locale} />
          )}
          <img src={pinIcon} width="20" alt="top" />
        </Button>
      )}

      {!isGeneral && (
        <QuestionType
          onMouseEnter={expertPopoverOnMouseEnter}
          onMouseLeave={expertPopoverOnMouseLeave}
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
            {getFormattedDate(postTime, locale, MONTH_3LETTERS__DAY_TIME)}
          </Span>
        </A>
      </p>
      <div className="d-flex align-items-center flex-wrap">
        <Tags
          className="my-1"
          chosenTags={tags}
          communityId={communityId}
          communities={communities}
        >
          {!single ? (
            <QuestionCommunity
              className="my-1"
              communities={communities}
              communityId={communityId}
            />
          ) : null}
        </Tags>
      </div>
    </Container>
  );
};

Body.propTypes = {
  id: PropTypes.string,
  user: PropTypes.string,
  displayPin: PropTypes.bool,
  title: PropTypes.string,
  userInfo: PropTypes.object,
  postTime: PropTypes.number,
  locale: PropTypes.string,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communities: PropTypes.array,
  tags: PropTypes.array,
  profileInfo: PropTypes.object,
  isGeneral: PropTypes.bool,
  isTopQuestion: PropTypes.bool,
  displayPinMove: PropTypes.bool,
  topQuestionActionProcessing: PropTypes.bool,
  addToTopQuestionsDispatch: PropTypes.func,
  removeFromTopQuestionsDispatch: PropTypes.func,
};

export default memo(Body);
