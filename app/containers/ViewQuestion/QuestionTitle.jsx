import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { BG_SUCCESS, TEXT_PREMIUM } from 'style-constants';

import checkIcon from 'images/okayGreen.svg?inline';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { getFormattedDate, dateNowInSeconds } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME, POST_TYPE } from 'utils/constants';

import Base from 'components/Base';
import H3 from 'components/H3';
import TagList from 'components/TagsList';
import QuestionCommunity from 'components/QuestionForProfilePage/QuestionCommunity';
import Button from 'components/Button/Outlined/InfoMedium';
import { Bounty } from './Bounty';

import { MarkAnswerNotification } from './MarkAsAcceptedIcon';

import { BOUNTY_PAID_CLASSNAME } from './constants';

import {
  makeSelectAccount,
  makeSelectProfileInfo,
} from '../AccountProvider/selectors';

import messages from './messages';

export const B = Button.extend`
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 32px;
  transition-property: none;
  width: max-content;
`.withComponent('span');

const QuestionName = H3.extend`
  display: inline;
`.withComponent('h3');

const Div = styled.div`
  min-width: 140px;
`;
const TitleContainer = styled.div`
  .${BOUNTY_PAID_CLASSNAME} {
    background-color: ${BG_SUCCESS};
  }
`;

const PromotionInfo = styled.div`
  color: ${TEXT_PREMIUM};
  margin-top: 10px;
  text-align: right;
`;

export const QuestionTitle = ({
  title,
  communities,
  user,
  questionData,
  profileInfo,
  locale,
  account,
}) => {
  const {
    tags,
    communityId,
    bestReply: correctAnswerId,
    answers,
    questionBounty,
    isGeneral,
    promote,
    author: questionAuthor,
    postType,
  } = questionData;

  const isActivePromotion = useMemo(
    () =>
      promote &&
      promote.endsTime > dateNowInSeconds() &&
      account === questionAuthor,
    [promote, account, questionAuthor],
  );

  const promotedQuestionEndsTime = useMemo(
    () => {
      if (typeof promote === 'object') {
        return getFormattedDate(
          promote.endsTime,
          locale,
          MONTH_3LETTERS__DAY_YYYY_TIME,
        );
      }

      return null;
    },
    [promote],
  );

  const isItWrittenByMe = profileInfo ? user === profileInfo.user : false;

  const isGeneralPost = postType === POST_TYPE.generalPost;
  const isExpertPost = postType === POST_TYPE.expertPost;

  return title ? (
    <Base
      paddingTop="5"
      paddingTopMedia="5"
      position="middle"
      paddingBottom="10"
      withoutBR
    >
      <Div>
        {!correctAnswerId && isItWrittenByMe && answers.length ? (
          <>
            <MarkAnswerNotification className="d-inline-flex">
              <img className="mr-2" src={checkIcon} alt="icon" />
              <FormattedMessage
                {...(isGeneral
                  ? messages.markGeneralQuestionAndGetEarn
                  : messages.markExpertQuestionAndGetEarn)}
              />
            </MarkAnswerNotification>
            <br />
          </>
        ) : null}

        <TitleContainer>
          <Bounty {...questionBounty} />
          <QuestionName>{title}</QuestionName>
        </TitleContainer>

        <TagList
          className="my-2"
          tags={tags}
          communityId={communityId}
          communities={communities}
        >
          {!isSingleCommunityWebsite() ? (
            <QuestionCommunity
              className="my-1"
              communities={communities}
              communityId={communityId}
              isGeneral={isGeneralPost}
              isExpert={isExpertPost}
            />
          ) : null}
        </TagList>
        {isActivePromotion && (
          <PromotionInfo>
            <FormattedMessage {...messages.questionIsPromoting} />{' '}
            {promotedQuestionEndsTime}
          </PromotionInfo>
        )}
      </Div>
    </Base>
  ) : null;
};

QuestionTitle.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communities: PropTypes.array,
  isItWrittenByMe: PropTypes.bool,
  isGeneral: PropTypes.bool,
  correctAnswerId: PropTypes.number,
  answersNumber: PropTypes.number,
  user: PropTypes.string,
  questionData: PropTypes.object,
  questionBounty: PropTypes.object,
  profileInfo: PropTypes.object,
  isTemporaryAccount: PropTypes.bool,
  locale: PropTypes.string,
  account: PropTypes.string,
  questionAuthor: PropTypes.string,
};

export default React.memo(
  connect(
    createStructuredSelector({
      profileInfo: makeSelectProfileInfo(),
      account: makeSelectAccount(),
    }),
    null,
  )(QuestionTitle),
);
